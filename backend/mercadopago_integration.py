import mercadopago
import os
from typing import Dict, Any, Optional
from datetime import datetime

class MercadoPagoIntegration:
    def __init__(self):
        self.access_token = os.getenv("MERCADOPAGO_ACCESS_TOKEN")
        self.public_key = os.getenv("MERCADOPAGO_PUBLIC_KEY")
        
        if not self.access_token:
            raise ValueError("MERCADOPAGO_ACCESS_TOKEN não configurado")
        
        self.sdk = mercadopago.SDK(self.access_token)
    
    def create_payment_preference(self, 
                                event_title: str,
                                ticket_price: float,
                                ticket_id: int,
                                buyer_email: str,
                                buyer_name: str,
                                success_url: str,
                                failure_url: str,
                                pending_url: str) -> Dict[str, Any]:
        """Cria preferência de pagamento no Mercado Pago"""
        
        preference_data = {
            "items": [
                {
                    "title": f"Ingresso - {event_title}",
                    "quantity": 1,
                    "unit_price": ticket_price,
                    "currency_id": "BRL",
                    "description": f"Ingresso para o evento: {event_title}"
                }
            ],
            "payer": {
                "email": buyer_email,
                "name": buyer_name
            },
            "back_urls": {
                "success": success_url,
                "failure": failure_url,
                "pending": pending_url
            },
            "auto_return": "approved",
            "external_reference": str(ticket_id),
            "notification_url": f"{os.getenv('API_BASE_URL', 'http://localhost:8000')}/webhooks/mercadopago",
            "statement_descriptor": "TICKETMETAL",
            "metadata": {
                "ticket_id": ticket_id,
                "event_title": event_title,
                "buyer_name": buyer_name
            }
        }
        
        try:
            preference = self.sdk.preference().create(preference_data)
            return {
                "success": True,
                "preference_id": preference["response"]["id"],
                "init_point": preference["response"]["init_point"],
                "sandbox_init_point": preference["response"]["sandbox_init_point"]
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_payment_status(self, payment_id: str) -> Dict[str, Any]:
        """Verifica status do pagamento"""
        try:
            payment = self.sdk.payment().get(payment_id)
            payment_data = payment["response"]
            
            return {
                "success": True,
                "status": payment_data["status"],
                "status_detail": payment_data["status_detail"],
                "transaction_amount": payment_data["transaction_amount"],
                "external_reference": payment_data["external_reference"],
                "date_approved": payment_data.get("date_approved"),
                "date_created": payment_data.get("date_created")
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def process_webhook(self, webhook_data: Dict[str, Any]) -> Dict[str, Any]:
        """Processa webhook do Mercado Pago"""
        try:
            if webhook_data.get("type") == "payment":
                payment_id = webhook_data.get("data", {}).get("id")
                if payment_id:
                    payment_status = self.get_payment_status(payment_id)
                    if payment_status["success"]:
                        return {
                            "success": True,
                            "payment_id": payment_id,
                            "status": payment_status["status"],
                            "external_reference": payment_status["external_reference"],
                            "transaction_amount": payment_status["transaction_amount"]
                        }
            
            return {
                "success": False,
                "error": "Webhook não processado"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def refund_payment(self, payment_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        """Estorna pagamento"""
        try:
            refund_data = {}
            if amount:
                refund_data["amount"] = amount
            
            refund = self.sdk.refund().create(payment_id, refund_data)
            
            return {
                "success": True,
                "refund_id": refund["response"]["id"],
                "status": refund["response"]["status"]
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_payment_methods(self) -> Dict[str, Any]:
        """Obtém métodos de pagamento disponíveis"""
        try:
            payment_methods = self.sdk.payment_methods().list_all()
            return {
                "success": True,
                "payment_methods": payment_methods["response"]
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
