import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  beneficios = {
      "codigoRetorno": 200,
      "mensagem": "Success",
      "objetoRetorno": [
        {
          "nomeBeneficio": "Benefício 1",
          "numeroBeneficio": "111111",
          "descricaoBeneficio": "Descrição do Benefício 1",
          "especieBeneficio": "Espécie 1",
          "titularConta": "Titular 1"
        }
      ]
    };

    contas = [
      {
        "agencia": 3995,
        "conta": 487007,
        "digito": "7",
        "tipoConta": "corrente",
        "titular": "EURYSTHEUS TDM BOUMAN"
      }
    ]

    elegibilidade = {
      "codigoRetorno": 200,
      "mensagem": "Success",
      "objetoRetorno": {
        "beneficioLocalizado": false,
        "cpv": false
      }
    }

    efetivacao = {
      "codigoRetorno": 204,
      "mensagem": "No Content",
      "objetoRetorno": null
    }

    erro = {
      "active": "false"
    }

  getHello(): any {
    return this.contas;
  }
}
