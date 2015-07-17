#!/usr/bin/python

from leela.core import *
from leela.db_support.mongo import MongoDB

class MyService(AService):
    @classmethod
    @asyncio.coroutine
    def initialize(cls, config):
        #mongodb backend initialization example
        #
        #if 'db_name' not in config:
        #    raise RuntimeError('db_name does not found in YAML config')
        #db = MongoDB(config.get('db_name', None))
        #yield from db.connect(config.get('db_hostname', '127.0.0.1'),
        #                      config.get('db_port', 27017))
        #Model.init(db)

        db = None
        return cls(db)

    # TODO: implement your API here...
    #
    #@reg_get('echo')
    #def echo_method(self, data, http_req):
    #    return data

