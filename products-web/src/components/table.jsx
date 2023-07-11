import { deleteProductByCode } from "@/api/products";
import { Table, Row, Col, Tooltip } from "@nextui-org/react";
import Link from "next/link";

export default function TableComponent({columns, rows, actions}) {

  const handleDeleteAsync = async (code) => {
    console.log("codeeee", code)
    if (confirm('Are you sure you want to delete this product?')) {
      // Save it!
      let response = await deleteProductByCode(code);

      alert(response)
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }

  const renderCell = (product, columnKey) => {

    const cellValue = product[columnKey];
    //TODO: Make it more generic
    if (columnKey == "actions"){
      return (
        <Row justify="center" align="center">
          <Col css={{ d: "flex" }}>
            <Tooltip content="Product details">
            <Link href={`/products/details/${product.code}`}>Details</Link>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit product">
              <Link href={`/products/edit/${product.code}`}>Edit</Link>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }} onClick={async () => await handleDeleteAsync(product.code)}>
            <Tooltip
              content="Delete product"
              color="error"
            >
              Delete
            </Tooltip>
          </Col>
        </Row>
      );
    }
    else{
      return cellValue;
    }
  };

  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
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
