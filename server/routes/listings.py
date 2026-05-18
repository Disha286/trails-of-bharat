"""
Listings routes — GET, POST, DELETE /api/listings
"""

from fastapi import APIRouter, HTTPException, Depends, status, Request
from pydantic import BaseModel
from typing import Optional, List
from jose import jwt, JWTError
import os
import time

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-change-me")
ALGORITHM  = os.getenv("ALGORITHM", "HS256")

# In-memory listings database
LISTINGS_DB = [
    {
        "id": "1",
        "name": "Blue Pottery Vase",
        "price": 850,
        "status": "Active",
        "img": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
        "category": "handicrafts",
        "description": "Hand-crafted blue pottery from Jaipur artisans using traditional Mughal techniques.",
        "state": "Rajasthan",
        "tag": "Bestseller",
        "originalPrice": 1200,
        "rating": 4.7,
        "reviews": 128,
        "vendor_id": "1",
    },
    {
        "id": "2",
        "name": "Kerala Homestay — 2N/3D",
        "price": 5500,
        "status": "Active",
        "img": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80",
        "category": "homestays",
        "description": "Stay in a traditional tharavad home beside Alleppey backwaters with home-cooked meals.",
        "state": "Kerala",
        "tag": "Top Rated",
        "originalPrice": 7000,
        "rating": 4.9,
        "reviews": 94,
        "vendor_id": "1",
    }
]

class ListingCreate(BaseModel):
    name: str
    price: int
    category: str
    description: str
    state: str
    tag: Optional[str] = ""
    img: str

def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid token")
    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@router.get("/")
async def get_listings(category: Optional[str] = None, q: Optional[str] = None):
    results = LISTINGS_DB
    if category and category.lower() != "all":
        results = [L for L in results if L["category"].lower() == category.lower()]
    if q:
        q_lower = q.lower()
        results = [L for L in results if q_lower in L["name"].lower() or q_lower in L["state"].lower()]
    return {"count": len(results), "data": results}

@router.get("/my-listings")
async def get_vendor_listings(user: dict = Depends(get_current_user)):
    user_id = user.get("sub")
    results = [L for L in LISTINGS_DB if L.get("vendor_id") == user_id]
    return results

@router.post("/")
async def create_listing(listing: ListingCreate, user: dict = Depends(get_current_user)):
    new_listing = {
        "id": str(int(time.time() * 1000)),
        "name": listing.name,
        "price": listing.price,
        "status": "Active",
        "img": listing.img,
        "category": listing.category,
        "description": listing.description,
        "state": listing.state,
        "tag": listing.tag,
        "vendor_id": user.get("sub"),
        "originalPrice": listing.price,
        "rating": 0,
        "reviews": 0
    }
    LISTINGS_DB.append(new_listing)
    return new_listing

@router.delete("/{listing_id}")
async def delete_listing(listing_id: str, user: dict = Depends(get_current_user)):
    global LISTINGS_DB
    user_id = user.get("sub")
    
    listing = next((L for L in LISTINGS_DB if L["id"] == listing_id), None)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    if listing.get("vendor_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this listing")
        
    LISTINGS_DB = [L for L in LISTINGS_DB if L["id"] != listing_id]
    return {"message": "Listing deleted successfully"}
