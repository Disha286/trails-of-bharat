"""Guides route — GET /api/guides"""
from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

import json
import os

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "guides.json")

try:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        GUIDES = json.load(f)
except Exception as e:
    print(f"Error loading guides.json: {e}")
    GUIDES = []


@router.get("/")
async def get_guides(
    guide_type: Optional[str] = Query(None, alias="type"),
    region:     Optional[str] = Query(None),
    verified:   Optional[bool] = Query(None),
    q:          Optional[str] = Query(None),
):
    results = GUIDES
    if guide_type:
        results = [g for g in results if g["type"].lower() == guide_type.lower()]
    if region:
        results = [g for g in results if g["region"].lower() == region.lower()]
    if verified is not None:
        results = [g for g in results if g["verified"] == verified]
    if q:
        q_lower = q.lower()
        results = [g for g in results if q_lower in g["name"].lower() or q_lower in g["region"].lower() or q_lower in g["specialty"].lower()]
    return {"count": len(results), "data": results}


@router.get("/{guide_id}")
async def get_guide(guide_id: int):
    guide = next((g for g in GUIDES if g["id"] == guide_id), None)
    if not guide:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail=f"Guide {guide_id} not found")
    return guide
