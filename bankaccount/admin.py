from django.contrib import admin

from .models import Bankaccount, Deposit, Withdraw


class BankaccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'balance')


admin.site.register(Bankaccount, BankaccountAdmin)


class WithdrawAdmin(admin.ModelAdmin):
    list_display = ("name", 'amount', 'bankaccount')


admin.site.register(Withdraw, WithdrawAdmin)


class DepositAdmin(admin.ModelAdmin):
    list_display = ("name", 'amount', 'bankaccount')


admin.site.register(Deposit, DepositAdmin)
