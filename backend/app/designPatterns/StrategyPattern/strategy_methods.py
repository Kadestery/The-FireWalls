from fastapi import HTTPException
from .permission_strategies import Context, ParentPermissionStrategy, ChildPermissionStrategy, GuestPermissionStrategy, StrangerPermissionStrategy
from app.DB.schemas import ActionType

def get_permissions(profile_type: str, action: ActionType):
     
    context = Context()
    # Create a context object with the profile's permission strategy
    match profile_type:
        case "parent":
            context.set_permission_strategy(ParentPermissionStrategy()) 
        case "child":
            context.set_permission_strategy(ChildPermissionStrategy())  
        case "guest":
            context.set_permission_strategy(GuestPermissionStrategy())
        case "stranger":
            context.set_permission_strategy(StrangerPermissionStrategy())
        case _:
            raise HTTPException(status_code=400, detail="Unknown profile type")
    
        
    return context.executeStrategy(action)
