import os
from distutils.util import strtobool

DEBUG = bool(strtobool(os.getenv("FLASK_DEBUG", "false")))

SERVER_NAME = os.getenv(
    "SERVER_NAME", "localhost:{0}".format(os.getenv("PORT", "8080"))
)
