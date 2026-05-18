"""Destinations route — GET /api/destinations"""
from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

import json
import os

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "destinations.json")

try:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        DESTINATIONS = json.load(f)
except Exception as e:
    print(f"Error loading destinations.json: {e}")
    DESTINATIONS = []


@router.get("/")
async def get_destinations(
    category: Optional[str] = Query(None),
    state:    Optional[str] = Query(None),
    q:        Optional[str] = Query(None),
    budget:   Optional[str] = Query(None),
):
    results = DESTINATIONS
    if category:
        results = [d for d in results if d["category"].lower() == category.lower()]
    if state:
        results = [d for d in results if d["state"].lower() == state.lower()]
    if budget:
        results = [d for d in results if d["budget"].lower() == budget.lower()]
    if q:
        q_lower = q.lower()
        results = [d for d in results if q_lower in d["name"].lower() or q_lower in d["state"].lower() or any(q_lower in t.lower() for t in d.get("tags", []))]
    return {"count": len(results), "data": results}


@router.get("/{destination_id}")
async def get_destination(destination_id: str):
    dest = next((d for d in DESTINATIONS if d["id"] == destination_id), None)
    if not dest:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail=f"Destination '{destination_id}' not found")
    return dest
