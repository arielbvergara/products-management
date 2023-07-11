import { Table } from "@nextui-org/react";

export default function TableComponent({columns, rows, renderCell}) {

  return (
    <Table
      aria-label="Example table with custom cells"
      shadow={true}
      css={{
        height: "150px",
        minWidth: "60%",
      }}
      bordered={false}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item) => (
          <Table.Row key={item.code}>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}
