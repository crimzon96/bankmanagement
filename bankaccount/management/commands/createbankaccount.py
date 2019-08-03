from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from bankaccount.models import Bankaccount

User = get_user_model()

def createbankaccount():
    user = User.objects.first()
    Bankaccount.objects.create(user=user)


class Command(BaseCommand):
    def handle(self, *args, **options):
        createbankaccount()
