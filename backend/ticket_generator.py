from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import qrcode
import io
from datetime import datetime
from typing import Dict, Any

class TicketGenerator:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self.setup_custom_styles()
    
    def setup_custom_styles(self):
        # Estilo para título do evento
        self.styles.add(ParagraphStyle(
            name='EventTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            alignment=TA_CENTER,
            textColor=colors.darkblue
        ))
        
        # Estilo para informações do ticket
        self.styles.add(ParagraphStyle(
            name='TicketInfo',
            parent=self.styles['Normal'],
            fontSize=12,
            spaceAfter=12,
            alignment=TA_LEFT
        ))
        
        # Estilo para cabeçalho
        self.styles.add(ParagraphStyle(
            name='Header',
            parent=self.styles['Heading2'],
            fontSize=18,
            spaceAfter=20,
            alignment=TA_CENTER,
            textColor=colors.darkgreen
        ))
    
    def generate_qr_code(self, qr_data: str) -> bytes:
        """Gera QR Code e retorna como bytes"""
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(qr_data)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Converter para bytes
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        return img_bytes.getvalue()
    
    def create_ticket_pdf(self, ticket_data: Dict[str, Any], event_data: Dict[str, Any]) -> bytes:
        """Cria PDF do ingresso"""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        story = []
        
        # Cabeçalho
        story.append(Paragraph("🎫 TICKETMETAL", self.styles['Header']))
        story.append(Spacer(1, 20))
        
        # Título do evento
        story.append(Paragraph(event_data['title'], self.styles['EventTitle']))
        story.append(Spacer(1, 20))
        
        # Informações do evento
        event_info = [
            ['📅 Data:', event_data['date'].strftime('%d/%m/%Y às %H:%M')],
            ['📍 Local:', event_data['location']],
            ['🏠 Endereço:', event_data['address']],
            ['🏙️ Cidade:', f"{event_data['city']} - {event_data['state']}"],
        ]
        
        event_table = Table(event_info, colWidths=[1.5*inch, 4*inch])
        event_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ]))
        
        story.append(event_table)
        story.append(Spacer(1, 30))
        
        # Informações do ticket
        ticket_info = [
            ['🎫 Número do Ingresso:', ticket_data['ticket_number']],
            ['💰 Valor Pago:', f"R$ {ticket_data['price_paid']:.2f}"],
            ['📅 Data da Compra:', ticket_data['purchased_at'].strftime('%d/%m/%Y às %H:%M')],
            ['👤 Comprador:', ticket_data['buyer_name']],
        ]
        
        ticket_table = Table(ticket_info, colWidths=[1.5*inch, 4*inch])
        ticket_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('BACKGROUND', (0, 0), (-1, -1), colors.lightgrey),
        ]))
        
        story.append(ticket_table)
        story.append(Spacer(1, 30))
        
        # QR Code
        qr_data = f"TICKETMETAL:{ticket_data['qr_code']}"
        qr_bytes = self.generate_qr_code(qr_data)
        
        qr_image = Image(io.BytesIO(qr_bytes), width=2*inch, height=2*inch)
        story.append(qr_image)
        story.append(Spacer(1, 20))
        
        # Instruções
        instructions = [
            "📱 INSTRUÇÕES:",
            "• Apresente este ingresso na entrada do evento",
            "• O QR Code será escaneado para validação",
            "• Mantenha este documento em segurança",
            "• Em caso de dúvidas, entre em contato com o organizador"
        ]
        
        for instruction in instructions:
            story.append(Paragraph(instruction, self.styles['TicketInfo']))
        
        story.append(Spacer(1, 30))
        
        # Rodapé
        footer = f"Gerado em {datetime.now().strftime('%d/%m/%Y às %H:%M')} | TicketMetal"
        story.append(Paragraph(footer, self.styles['Normal']))
        
        # Construir PDF
        doc.build(story)
        buffer.seek(0)
        
        return buffer.getvalue()
    
    def create_event_report_pdf(self, event_data: Dict[str, Any], stats: Dict[str, Any]) -> bytes:
        """Cria relatório do evento em PDF"""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        story = []
        
        # Cabeçalho
        story.append(Paragraph("📊 RELATÓRIO DO EVENTO", self.styles['Header']))
        story.append(Spacer(1, 20))
        
        # Informações do evento
        story.append(Paragraph(event_data['title'], self.styles['EventTitle']))
        story.append(Spacer(1, 20))
        
        # Estatísticas
        stats_data = [
            ['📊 ESTATÍSTICAS DE VENDAS', ''],
            ['Total de Ingressos:', f"{stats['max_tickets']}"],
            ['Ingressos Vendidos:', f"{stats['tickets_sold']}"],
            ['Ingressos Disponíveis:', f"{stats['tickets_available']}"],
            ['Taxa de Ocupação:', f"{stats['occupancy_rate']:.1f}%"],
            ['Receita Total:', f"R$ {stats['total_revenue']:.2f}"],
            ['Preço Médio:', f"R$ {stats['average_price']:.2f}"],
        ]
        
        stats_table = Table(stats_data, colWidths=[2.5*inch, 3*inch])
        stats_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, 0), 'Helvetica-Bold'),
            ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('BACKGROUND', (0, 0), (-1, 0), colors.darkblue),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('BACKGROUND', (0, 1), (0, -1), colors.lightgrey),
        ]))
        
        story.append(stats_table)
        story.append(Spacer(1, 30))
        
        # Rodapé
        footer = f"Relatório gerado em {datetime.now().strftime('%d/%m/%Y às %H:%M')} | TicketMetal"
        story.append(Paragraph(footer, self.styles['Normal']))
        
        # Construir PDF
        doc.build(story)
        buffer.seek(0)
        
        return buffer.getvalue()
