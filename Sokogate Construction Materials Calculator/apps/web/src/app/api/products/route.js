import sql from "@/app/api/utils/sql";

// GET /api/products - List all products, optionally filtered by category
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let products;
    if (category) {
      products = await sql`
        SELECT * FROM products 
        WHERE category = ${category}
        ORDER BY name ASC
      `;
    } else {
      products = await sql`
        SELECT * FROM products 
        ORDER BY category, name ASC
      `;
    }

    return Response.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, category, unit, price, description } = body;

    if (!name || !category || !unit || price === undefined) {
      return Response.json(
        { error: "Missing required fields: name, category, unit, price" },
        { status: 400 },
      );
    }

    const [product] = await sql`
      INSERT INTO products (name, category, unit, price, description)
      VALUES (${name}, ${category}, ${unit}, ${price}, ${description || null})
      RETURNING *
    `;

    return Response.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return Response.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
