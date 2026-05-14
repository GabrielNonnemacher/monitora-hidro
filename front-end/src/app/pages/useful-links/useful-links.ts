import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-useful-links',
  templateUrl: './useful-links.html',
  styleUrls: ['./useful-links.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
})
export class UsefulLinksPage {
  protected readonly links = [
    {
      id: 'inmet',
      name: 'Inmet',
      url: 'https://portal.inmet.gov.br/',
      icon: 'cloud',
      description: 'Instituto Nacional de Meteorologia - Dados meteorológicos e climáticos.',
    },
    {
      id: 'ana',
      name: 'ANA - Agência Nacional das Águas',
      url: 'https://www.gov.br/ana/pt-br',
      icon: 'water',
      description: 'Agência Nacional das Águas - Monitoramento de recursos hídricos.',
    },
    {
      id: 'defesa-civil',
      name: 'Defesa Civil Nacional',
      url: 'https://www.defesacivil.gov.br/',
      icon: 'warning',
      description: 'Defesa Civil Nacional - Alertas e orientações de segurança.',
    },
    {
      id: 'sgb',
      name: 'SGB - Serviço Geológico do Brasil',
      url: 'https://www.sgb.gov.br/',
      icon: 'map',
      description: 'Serviço Geológico do Brasil - Monitoramento geológico e hidrológico.',
    },
  ];
}
