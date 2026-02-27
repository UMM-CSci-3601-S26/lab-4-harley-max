
package umm3601.Inventory;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
// import static com.mongodb.client.model.Filters.ne;
import static com.mongodb.client.model.Filters.regex;

import java.util.ArrayList;
import java.util.List;
// import java.util.Map;
import java.util.Objects;
import java.util.regex.Pattern;

import org.bson.Document;
import org.bson.UuidRepresentation;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
// import com.mongodb.client.result.DeleteResult;

import io.javalin.Javalin;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.http.NotFoundResponse;
import umm3601.Controller;

public class InventoryController implements Controller {

  private static final String API_TODO = "/api/inventory";
  private static final String API_TODO_BY_ID = "/api/inventory/{id}";
  static final String SCHOOL_KEY = "school";
  static final String GRADE_KEY = "grade";
  static final String DESCRIPTION_KEY = "description";
  static final String QUANTITY_KEY = "quantity";
  static final String PROPERTIES_KEY = "properties";

  private final JacksonMongoCollection<Inventory> inventoryCollection;

  // Constructs a controller for inventory items

  public InventoryController(MongoDatabase database) {
    inventoryCollection = JacksonMongoCollection.builder().build(
        database,
        "inventory",
        Inventory.class,
        UuidRepresentation.STANDARD);
  }

  // Set the json file for a single searched `id`

  public void getInventory(Context ctx) {
    String id = ctx.pathParam("id");
    Inventory inventory;

    try {
      inventory = inventoryCollection.find(eq("_id", new ObjectId(id))).first();
    } catch (IllegalArgumentException e) {
      throw new BadRequestResponse("The requested inventory id wasn't a legal Mongo Object ID.");
    }
    if (inventory == null) {
      throw new NotFoundResponse("The requested inventory was not found");
    } else {
      ctx.json(inventory);
      ctx.status(HttpStatus.OK);
    }
  }

  // Set the json file for seeing all todos

  public void getInventories(Context ctx) {
    // Build filters (status, contains, owner, category)
    Bson filter = constructFilter(ctx);

    // Parse Limit
    Integer limit = parseLimit(ctx);

    // Parse sorting order
    Bson sortingOrder = constructSortingOrder(ctx);

    // Build the MongoDB query
    FindIterable<Inventory> results = inventoryCollection.find(filter);

    // Apply sorting if present
    if (sortingOrder != null) {
      results = results.sort(sortingOrder);
    }

    /* All the filters and sorting are put first
       to allow limiting to be the last computed */

    // Apply limit if present
    if (limit != null) {
      results = results.limit(limit);
    }

    // Materialize results
    ArrayList<Inventory> matchingInventories = results.into(new ArrayList<>());

    // Return JSON
    ctx.json(matchingInventories);
    ctx.status(HttpStatus.OK);
  }

/**
 * Constructing a Bson limited to use in the `limit` method based on the
 * query parameter given from the context (ctx).
 */

  private Integer parseLimit(Context ctx) {
    // If no limit, no limit
    if (!ctx.queryParamMap().containsKey("limit")) {
      return null;
    }

    String limitParam = ctx.queryParam("limit");

    try {
      int limit = Integer.parseInt(limitParam);
      if (limit < 1) {
        throw new BadRequestResponse("The limit must be a positive integer.");
      }
      return limit;
    } catch (NumberFormatException e) {
      throw new BadRequestResponse("The limit must be a number.");
    }

  }

/**
 * Constructing a Bson filter to use in the `find` method based on the
 * query parameters given from the context (ctx).
 *
 * Checking for the presence of `owner`, `status`, `body`, and `category`
 * parameters and creating a filter document that will match todos with
 * the specified values for those fields.
 */

  private Bson constructFilter(Context ctx) {
    List<Bson> filters = new ArrayList<>(); // start with an empty list of filters

    // School Filter
    if (ctx.queryParamMap().containsKey(SCHOOL_KEY)) {
      Pattern pattern = Pattern.compile(Pattern.quote(ctx.queryParam(SCHOOL_KEY)));
      filters.add(regex(SCHOOL_KEY, pattern));
    }

    // Grade Filter
    if (ctx.queryParamMap().containsKey(GRADE_KEY)) {
      Pattern pattern = Pattern.compile(Pattern.quote(ctx.queryParam(GRADE_KEY)), Pattern.CASE_INSENSITIVE);
      filters.add(regex(GRADE_KEY, pattern));
    }

    // Description Filter
    if (ctx.queryParamMap().containsKey(DESCRIPTION_KEY)) {
      Pattern pattern = Pattern.compile(Pattern.quote(ctx.queryParam(DESCRIPTION_KEY)), Pattern.CASE_INSENSITIVE);
      filters.add(regex(DESCRIPTION_KEY, pattern));
    }

    // properties Filter
    if (ctx.queryParamMap().containsKey(PROPERTIES_KEY)) {
      String propertiesParam = ctx.queryParam(PROPERTIES_KEY);
      boolean propertiesValue;
      if (propertiesParam.equalsIgnoreCase("complete")) {
        propertiesValue = true;
      } else if (propertiesParam.equalsIgnoreCase("incomplete")) {
        propertiesValue = false;
      } else {
        throw new BadRequestResponse("Status must be 'complete' or 'incomplete'.");
      }
      filters.add(Filters.eq(PROPERTIES_KEY, propertiesValue));
    }

    // Quantity Filter
    if (ctx.queryParamMap().containsKey(QUANTITY_KEY)) {
      String quantityParam = ctx.queryParam(QUANTITY_KEY);
      try {
        int quantityValue = Integer.parseInt(quantityParam);
        filters.add(Filters.eq(QUANTITY_KEY, quantityValue));
      } catch (NumberFormatException e) {
        throw new BadRequestResponse("The quantity must be a number.");
      }
    }

    // Contains Filter
    if (ctx.queryParamMap().containsKey("contains")) {
      Pattern pattern = Pattern.compile(Pattern.quote(ctx.queryParam("contains")));
      filters.add(regex(DESCRIPTION_KEY, pattern));
    }

    Bson combinedFilter = filters.isEmpty() ? new Document() : and(filters);

    return combinedFilter;
  }

  private Bson constructSortingOrder(Context ctx) {
    // Default sorting (owner)
    String sortBy = Objects.requireNonNullElse(ctx.queryParam("sortby"), SCHOOL_KEY);

    // Validating allowed fields
    if (!List.of(SCHOOL_KEY, GRADE_KEY, DESCRIPTION_KEY, PROPERTIES_KEY, QUANTITY_KEY).contains(sortBy)) {
      throw new BadRequestResponse("Invalid sortby field.");
    }
    return Sorts.ascending(sortBy);
  }

  // public void addNewTodo(Context ctx) {
  //   String body = ctx.body();
  //   Todo newTodo = ctx.bodyValidator(Todo.class)
  //     .check(td -> td.owner != null && td.owner.length() > 0,
  //       "Todo must have a non-empty owner name; body was " + body)
  //     .check(td -> td.body != null && td.body.length() > 0,
  //       "Todo must have a non-empty body name; body was " + body)
  //     .check(td -> td.category != null && td.category.length() > 0,
  //       "Todo must have a non-empty category name; body was " + body)
  //     .check(td -> td.status, "Todo must have a status.")
  //     .get();

  //   todoCollection.insertOne(newTodo);

  //   ctx.json(Map.of("id", newTodo._id));
  //   ctx.status(HttpStatus.CREATED);
  // }


  // public void deleteTodo(Context ctx) {
  //   String id = ctx.pathParam("id");
  //   DeleteResult deleteResult = todoCollection.deleteOne(eq("_id", new ObjectId(id)));

  //   if (deleteResult.getDeletedCount() != 1) {
  //     ctx.status(HttpStatus.NOT_FOUND);
  //     throw new NotFoundResponse(
  //       "Was unable to delete ID "
  //         + id
  //         + "; perhaps illegal ID or an ID for an item not in the system?");
  //   }
  //   ctx.status(HttpStatus.OK);
  // }

  @Override
  public void addRoutes(Javalin server) {

    server.get(API_TODO_BY_ID, this::getInventory);

    server.get(API_TODO, this::getInventories);

    // server.post(API_TODO, this::addNewTodo);

    // server.delete(API_TODO_BY_ID, this::deleteTodo);
  }

}
