from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator, OriginValidator
from chat.routing import websocket_urlpatterns
import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# application = ProtocolTypeRouter({
#   "http": get_asgi_application(),
# 	"websocket": OriginValidator(
# 		URLRouter(
# 			websocket_urlpatterns
# 		),
# 		["*"],
# 	),
# })

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
	"websocket": OriginValidator(
		AuthMiddlewareStack(
			URLRouter(
				websocket_urlpatterns
			)
		),
  		["*"],
	),
})