import sql from "@/app/api/utils/sql";

// GET /api/products/[id] - Get a single product
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const [product] = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const { name, category, unit, price, description } = body;

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
    }
    if (category !== undefined) {
      updates.push(`category = $${paramCount++}`);
      values.push(category);
    }
    if (unit !== undefined) {
      updates.push(`unit = $${paramCount++}`);
      values.push(unit);
    }
    if (price !== undefined) {
      updates.push(`price = $${paramCount++}`);
      values.push(price);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }

    updates.push(`updated_at = NOW()`);

    if (updates.length === 1) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    values.push(id);
    const query = `
      UPDATE products 
      SET ${updates.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const [product] = await sql(query, values);

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ product });
  } catch (error) {
    console.error("Error updating product:", error);
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const [product] = await sql`
      DELETE FROM products WHERE id = ${id}
      RETURNING *
    `;

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
