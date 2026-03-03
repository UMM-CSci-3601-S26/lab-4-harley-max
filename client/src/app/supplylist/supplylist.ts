export interface SupplyList {
  school: string,
  grade: string,
  item: string,
  description: string,
  brand: string,
  color:string,
  size: string,
  type: string,
  material:string,
  count: number,
  quantity: number,
  notes: string
}

type NodeKind = 'school' | 'grade' | 'item';

export interface SupplyTreeNode {
  kind: NodeKind;
  name: string;
  children?: SupplyTreeNode[];
}
