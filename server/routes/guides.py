"""Guides route — GET /api/guides"""
from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

GUIDES = [
  {"id":1,"name":"Ramesh Choudhary","region":"Rajasthan","city":"Jaipur","specialty":"Heritage & Forts","type":"Cultural","languages":["Hindi","English","French"],"rating":4.9,"reviews":312,"price_per_day":2500,"experience_years":14,"availability":"Available","verified":True,"bio":"Born and raised in Jaipur, Ramesh brings Rajasthani history to life through stories passed for generations."},
  {"id":2,"name":"Tashi Wangchuk","region":"Ladakh","city":"Leh","specialty":"High-Altitude Trekking","type":"Adventure","languages":["Ladakhi","Hindi","English"],"rating":4.9,"reviews":189,"price_per_day":3500,"experience_years":16,"availability":"Available","verified":True,"bio":"Ex-army mountaineer with intimate knowledge of Ladakh's trails, altitude medicine, and Buddhist culture."},
  {"id":3,"name":"Priya Krishnamurthy","region":"Tamil Nadu","city":"Madurai","specialty":"Temple Architecture","type":"Cultural","languages":["Tamil","English","Telugu"],"rating":4.8,"reviews":267,"price_per_day":1800,"experience_years":9,"availability":"Available","verified":True,"bio":"Archaeology graduate who decodes Dravidian temple iconography with passion."},
  {"id":4,"name":"Arjun Singh Rathore","region":"Uttarakhand","city":"Rishikesh","specialty":"Adventure & Yoga","type":"Adventure","languages":["Hindi","English"],"rating":4.7,"reviews":430,"price_per_day":2000,"experience_years":12,"availability":"Available","verified":True,"bio":"Certified river guide and yoga instructor combining white-water rafting with meditative Ganges evenings."},
  {"id":5,"name":"Bhushan Gogoi","region":"Assam","city":"Guwahati","specialty":"Wildlife & Nature","type":"Wildlife","languages":["Assamese","Hindi","English"],"rating":4.8,"reviews":143,"price_per_day":2200,"experience_years":10,"availability":"Limited","verified":True,"bio":"Wildlife naturalist with expertise in Kaziranga's one-horned rhinos and Manas tiger territory."},
]


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
