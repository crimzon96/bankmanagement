from django.db import models
from django.contrib.auth import get_user_model
from django_extensions.db.models import TimeStampedModel
from django.db.models.signals import pre_save
from django.dispatch import receiver
from datetime import datetime
User = get_user_model()

# Create your models here.


class Bankaccount(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    balance = models.IntegerField()

    @property
    def check_balance(self):
        return self.balance

    def __str__(self):
        return f"{self.user} with balance of {self.balance}"


class Withdraw(TimeStampedModel):
    bankaccount = models.ForeignKey(Bankaccount, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    amount = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField(default=datetime.now, blank=True)
    image = models.ImageField(null=True, blank=True)
    source = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return str(self.amount)


class Deposit(TimeStampedModel):
    bankaccount = models.ForeignKey(Bankaccount, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    amount = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField(default=datetime.now, blank=True)
    image = models.ImageField(null=True, blank=True)
    source = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return str(self.amount)


@receiver(pre_save, sender=Withdraw)
def withdraw_from_balance(sender, instance, **kwargs):
    new_balance = instance.bankaccount.balance - instance.amount
    instance.bankaccount.balance = new_balance
    instance.bankaccount.save()


@receiver(pre_save, sender=Deposit)
def deposit_to_balance(sender, instance, **kwargs):
    new_balance = instance.bankaccount.balance + instance.amount
    instance.bankaccount.balance = new_balance
    instance.bankaccount.save()
