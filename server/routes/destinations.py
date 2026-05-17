"""Destinations route — GET /api/destinations"""
from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

DESTINATIONS = [
  {"id":"rajasthan","name":"Rajasthan","state":"Rajasthan","tagline":"Land of Kings","category":"Heritage","rating":4.8,"reviews":3240,"budget":"moderate","duration":"5-7 days","bestTime":"Oct – Mar","img":"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80","desc":"Rajasthan is a kaleidoscope of vibrant culture, majestic forts, golden deserts, and royal palaces.","highlights":["Amber Fort","Mehrangarh Fort","Lake Palace Udaipur","Sam Sand Dunes"],"tags":["Heritage","Desert","Forts","Culture"]},
  {"id":"kerala","name":"Kerala","state":"Kerala","tagline":"God's Own Country","category":"Eco Tourism","rating":4.9,"reviews":4120,"budget":"moderate","duration":"5-8 days","bestTime":"Sep – Mar","img":"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80","desc":"Kerala is a lush paradise of emerald backwaters, spice-scented hills, and pristine beaches.","highlights":["Alleppey Backwaters","Munnar Tea Gardens","Wayanad Wildlife","Varkala Beach"],"tags":["Backwaters","Nature","Beaches","Wildlife"]},
  {"id":"ladakh","name":"Ladakh","state":"Ladakh","tagline":"Land of High Passes","category":"Adventure","rating":4.7,"reviews":2890,"budget":"high","duration":"7-10 days","bestTime":"Jun – Sep","img":"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80","desc":"Ladakh offers breathtaking landscapes, ancient monasteries, shimmering lakes, and thrilling trails.","highlights":["Pangong Lake","Nubra Valley","Khardung La Pass","Hemis Monastery"],"tags":["Adventure","Mountains","Lakes","Monasteries"]},
  {"id":"goa","name":"Goa","state":"Goa","tagline":"Pearl of the Orient","category":"Beaches","rating":4.6,"reviews":5600,"budget":"budget","duration":"3-5 days","bestTime":"Nov – Feb","img":"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80","desc":"Goa blends Portuguese heritage with Indian coastal charm — golden beaches and vibrant nightlife.","highlights":["Baga Beach","Old Goa Churches","Dudhsagar Falls","Anjuna Market"],"tags":["Beaches","Nightlife","Heritage","Food"]},
  {"id":"varanasi","name":"Varanasi","state":"Uttar Pradesh","tagline":"City of Light","category":"Spiritual","rating":4.7,"reviews":3870,"budget":"budget","duration":"2-4 days","bestTime":"Oct – Mar","img":"https://images.unsplash.com/photo-1561361058-c24e36b4e33a?w=800&q=80","desc":"Varanasi is one of the world's oldest cities — a spiritual epicenter on the sacred Ganges.","highlights":["Dashashwamedh Ghat","Kashi Vishwanath Temple","Sarnath","Sunrise boat ride"],"tags":["Spiritual","Culture","Ghats","Temples"]},
  {"id":"meghalaya","name":"Meghalaya","state":"Meghalaya","tagline":"Abode of Clouds","category":"Eco Tourism","rating":4.8,"reviews":1540,"budget":"moderate","duration":"4-6 days","bestTime":"Oct – May","img":"https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800&q=80","desc":"Meghalaya has the world's wettest places, living root bridges, waterfalls, and limestone caves.","highlights":["Living Root Bridges","Dawki Crystal River","Mawsmai Cave","Nohkalikai Falls"],"tags":["Nature","Waterfalls","Caves","Culture"]},
]


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

