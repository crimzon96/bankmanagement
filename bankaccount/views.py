# Create your views here.
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Bankaccount, Withdraw
from .serializers import (BankaccountSerializer, DataUpdateSerializer,
                          DepositSerializer, WithdrawSerializer)


class BankAccountApiView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, pk, format=None):
        bankaccount = Bankaccount.objects.get(pk=pk)
        serializer = BankaccountSerializer(bankaccount)
        combine = list(
            bankaccount.deposit_set.all()) + list(
            bankaccount.withdraw_set.all())
        sorted_list = sorted(combine, key=lambda x: x.created)
        transactions = [
            {
                'id': x.id,
                "name": x.name,
                "status": "withdraw" if isinstance(x, Withdraw) else "deposit",
                "value": x.amount if isinstance(x, Withdraw) else x.amount,
                "created": x.created.strftime("%Y-%m-%d %H:%M"),
                "bank_account_id": x.bankaccount.id,
                "description": x.description,
            } for x in sorted_list
        ]
        new_data = serializer.data
        new_data.update(
            {
                "bankaccount": Bankaccount.objects.first().id,
                "withdraw": Bankaccount.objects.first(
                ).withdraw_set.all().values(),
                "deposit": Bankaccount.objects.first(
                ).deposit_set.all().values(),
                "all": transactions,
            }
        )
        return Response(new_data)

    def post(self, request, pk, format=None):
        if request.data.get("transaction").get("status") == "withdraw":
            serializer = WithdrawSerializer(data=request.data.get("transaction"))
        elif request.data.get("transaction").get("status") == "deposit":
            serializer = DepositSerializer(data=request.data.get("transaction"))
        if serializer.is_valid():
            serializer.save()
            succes_data = serializer.data
            succes_data.update({"succes": "succes"})
            return Response(succes_data, status=200)
        return Response(serializer.errors, status=400)
