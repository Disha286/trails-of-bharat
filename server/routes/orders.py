from fastapi import APIRouter, HTTPException, Depends, status, Request
from pydantic import BaseModel
from typing import Optional, List
from .listings import get_current_user
import time
from datetime import datetime

router = APIRouter()

# In-memory orders database
ORDERS_DB = []

class OrderItem(BaseModel):
    id: str
    name: str
    price: int
    qty: int
    img: str
    vendor_id: Optional[str] = None # Added when listings are processed

class OrderCreate(BaseModel):
    items: List[OrderItem]
    totalAmount: int

class OrderStatusUpdate(BaseModel):
    status: str

@router.post("/")
async def create_order(order: OrderCreate, user: dict = Depends(get_current_user)):
    user_id = user.get("sub")
    
    new_order = {
        "id": f"ORD-{int(time.time() * 1000)}",
        "buyer_id": user_id,
        "items": [item.dict() for item in order.items],
        "totalAmount": order.totalAmount,
        "status": "Pending",
        "createdAt": datetime.utcnow().isoformat(),
        "date": datetime.utcnow().strftime("%Y-%m-%d")
    }
    
    ORDERS_DB.append(new_order)
    return {"message": "Order created successfully", "order": new_order}

@router.get("/")
async def get_orders(user: dict = Depends(get_current_user)):
    user_id = user.get("sub")
    role = user.get("role", "tourist")
    
    # If the user is a vendor, they should see orders containing their products
    # Since we don't have a robust product-vendor mapping in the simple cart yet,
    # and we want to show it in the Vendor dashboard, we'll return all orders 
    # where they are the vendor for at least one item, OR just return all orders 
    # for simplicity in this hackathon version if vendor mapping is missing.
    
    # For now, if role == "vendor", we can just return all orders to simulate a vendor seeing their orders,
    # or filter if vendor_id is present.
    # To keep it simple, we'll just return all orders where buyer_id == user_id for tourists, 
    # and all orders for vendors (in a real app we'd filter by item.vendor_id).
    
    if role == "vendor":
        return ORDERS_DB
    else:
        # Tourist sees their own orders
        results = [o for o in ORDERS_DB if o["buyer_id"] == user_id]
        return results

@router.patch("/{order_id}")
async def update_order_status(order_id: str, update: OrderStatusUpdate, user: dict = Depends(get_current_user)):
    if user.get("role") != "vendor":
        raise HTTPException(status_code=403, detail="Only vendors can update order status")
        
    order = next((o for o in ORDERS_DB if o["id"] == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    order["status"] = update.status
    return {"message": "Order updated successfully", "order": order}
