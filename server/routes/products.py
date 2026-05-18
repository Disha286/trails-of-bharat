"""Products route — GET /api/products"""
from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

import json
import os

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "products.json")

try:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        PRODUCTS = json.load(f)
except Exception as e:
    print(f"Error loading products.json: {e}")
    PRODUCTS = []


@router.get("/")
async def get_products(
    category: Optional[str] = Query(None),
    state:    Optional[str] = Query(None),
    q:        Optional[str] = Query(None),
    min_price: Optional[int] = Query(None),
    max_price: Optional[int] = Query(None),
):
    results = PRODUCTS
    if category:
        results = [p for p in results if p["category"].lower() == category.lower()]
    if state:
        results = [p for p in results if p["state"].lower() == state.lower()]
    if min_price is not None:
        results = [p for p in results if p["price"] >= min_price]
    if max_price is not None:
        results = [p for p in results if p["price"] <= max_price]
    if q:
        q_lower = q.lower()
        results = [p for p in results if q_lower in p["name"].lower() or q_lower in p["state"].lower()]
    return {"count": len(results), "data": results}


@router.get("/{product_id}")
async def get_product(product_id: int):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found")
    return product
