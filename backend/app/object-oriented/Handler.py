class Handler:
    def __init__(self, next_handler=None):
        self.next_handler = next_handler

    def handle(self, request, db):
        if self.next_handler:
            return self.next_handler.handle(request, db)
        return None