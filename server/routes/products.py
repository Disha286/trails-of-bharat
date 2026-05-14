"""Products route — GET /api/products"""
from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

PRODUCTS = [
  {"id":1,"name":"Blue Pottery Vase","category":"Handicrafts","price":850,"originalPrice":1200,"rating":4.7,"reviews":128,"state":"Rajasthan","tag":"Bestseller","description":"Hand-crafted blue pottery from Jaipur artisans using traditional Mughal techniques.","seller":"Rajasthani Crafts Co.","img":"https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80"},
  {"id":2,"name":"Pashmina Shawl","category":"Textiles","price":3200,"originalPrice":4500,"rating":4.9,"reviews":243,"state":"Ladakh","tag":"Premium","description":"Authentic hand-woven Pashmina shawl from the high valleys of Ladakh.","seller":"Kashmir Threads","img":"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80"},
  {"id":3,"name":"Warli Art Canvas","category":"Art","price":1800,"originalPrice":2400,"rating":4.6,"reviews":89,"state":"Maharashtra","tag":"Tribal Art","description":"Traditional Warli tribal art hand-painted on canvas by Palghar artisans.","seller":"Tribal Roots Gallery","img":"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80"},
  {"id":4,"name":"Chettinad Spice Kit","category":"Local Foods","price":650,"originalPrice":850,"rating":4.8,"reviews":312,"state":"Tamil Nadu","tag":"Organic","description":"Authentic Chettinad spice blend — star anise, marathi mokku, and kalpasi.","seller":"Spice Garden TN","img":"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80"},
  {"id":5,"name":"Kerala Homestay 2N/3D","category":"Homestays","price":5500,"originalPrice":7000,"rating":4.9,"reviews":94,"state":"Kerala","tag":"Top Rated","description":"Stay in a traditional tharavad home beside Alleppey backwaters with home-cooked meals.","seller":"Backwater Homes","img":"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80"},
  {"id":6,"name":"Dhokra Tribal Elephant","category":"Art","price":2800,"originalPrice":3500,"rating":4.8,"reviews":58,"state":"Chhattisgarh","tag":"Tribal Art","description":"Lost-wax cast Dhokra metal art elephant from Bastar tribal artisans.","seller":"Bastar Crafts","img":"https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80"},
]


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
