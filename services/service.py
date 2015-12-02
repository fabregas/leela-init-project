import os
import asyncio
from leela.core.service import LeelaService
from leela.core.decorators import leela_get


class MyService(LeelaService):
    def __init__(self):
        # TODO: impement constructor if you need some config parameters
        # for you service
        # Don't forget change your configuration yaml file in this case
        pass

    @asyncio.coroutine
    def start(self):
        # TODO: implement this coroutine if need some async initialization
        # or just remove this method
        pass

    @asyncio.coroutine
    def stop(self):
        # TODO: implement this coroutine if need some async destructor
        # or just remove this method
        pass


    @leela_get('uname')
    def get_uname(self, data):
        """This method is example, you can remove it ;)"""

        uname = os.uname()

        return {'sysname': uname.sysname,
                'nodename': uname.nodename,
                'release': uname.release,
                'version': uname.version,
                'machine': uname.machine}

    # TODO: implement your API here...
    #
