from rest_framework import serializers

from .models import Bankaccount, Deposit, Withdraw


class BankaccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bankaccount
        fields = ['user', 'balance']


class WithdrawSerializer(serializers.ModelSerializer):
    class Meta:
        model = Withdraw
        fields = ['bankaccount', 'amount', "name", "description"]

    def create(self, validated_data):
        bankaccount = validated_data.get('bankaccount')
        name = validated_data.get('name')
        amount = validated_data.get('amount')
        description = validated_data.get('description')
        withdraw_object = Withdraw.objects.create(
            bankaccount=bankaccount,
            amount=amount, name=name,
            description=description
            )
        return withdraw_object


class DepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deposit
        fields = ['bankaccount', 'amount', "name", "description"]

    def create(self, validated_data):
        bankaccount = validated_data.get('bankaccount')
        name = validated_data.get('name')
        amount = validated_data.get('amount')
        description = validated_data.get('description')
        deposit_object = Deposit.objects.create(
            bankaccount=bankaccount,
            amount=amount, name=name,
            description=description
            )
        return deposit_object


class DataUpdateSerializer(serializers.Serializer):
    did_data_update = serializers.CharField(max_length=100)
