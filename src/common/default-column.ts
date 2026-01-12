export const defaultColumn = [
  { name: 'id', comment: '主键ID', type: 'bigint', primaryKey: true },
  { name: 'created_at', comment: '创建时间', type: 'datetime', primaryKey: false },
  { name: 'created_id', comment: '创建人ID', type: 'bigint', primaryKey: true },
  { name: 'updated_at', comment: '更新时间', type: 'datetime', primaryKey: false },
  { name: 'updated_id', comment: '更新人ID', type: 'bigint', primaryKey: true },
  { name: 'deleted_at', comment: '删除时间', type: 'datetime', primaryKey: false },
  { name: 'deleted_id', comment: '删除人ID', type: 'bigint', primaryKey: true },
  { name: 'remarks', comment: '备注', type: 'varchar', primaryKey: false },
  { name: 'order_no', comment: '排序', type: 'int', primaryKey: false },
];