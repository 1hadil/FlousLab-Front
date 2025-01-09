import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PredictionService } from 'src/app/services/prediction.service';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PieController } from 'chart.js';

// Enregistrer tous les contrôleurs nécessaires
Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PieController);

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit, AfterViewInit {
  inputData: any = {
    "Time": 4462,
    "V1": -2.30334956758553,
    "V2": 1.759247460267,
    "V3": -0.359744743330052,
    "V4": 2.33024305053917,
    "V5": -0.821628328375422,
    "V6": -0.0757875706194599,
    "V7": 0.562319782266954,
    "V8": -0.399146578487216,
    "V9": -0.238253367661746,
    "V10": -1.52541162656194,
    "V11": 2.03291215755072,
    "V12": -6.56012429505962,
    "V13": 0.0229373234890961,
    "V14": -1.47010153611197,
    "V15": -0.698826068579047,
    "V16": -2.28219382856251,
    "V17": -4.78183085597533,
    "V18": -2.61566494476124,
    "V19": -1.33444106667307,
    "V20": -0.430021867171611,
    "V21": -0.294166317554753,
    "V22": -0.932391057274991,
    "V23": 0.172726295799422,
    "V24": -0.0873295379700724,
    "V25": -0.156114264651172,
    "V26": -0.542627889040196,
    "V27": 0.0395659889264757,
    "V28": -0.153028796529788,
    "Amount": 239.93
  };
  // inputData: any = {
  //   "Time": 1000,
  //   "V1": 100.0,
  //   "V2": 50.0,
  //   "V3": -50.0,
  //   "V4": 20.0,
  //   "V5": 10.0,
  //   "V6": -30.0,
  //   "V7": 25.0,
  //   "V8": -15.0,
  //   "V9": 5.0,
  //   "V10": -5.0,
  //   "V11": 10.0,
  //   "V12": 7.0,
  //   "V13": 0.0,
  //   "V14": 3.0,
  //   "V15": 8.0,
  //   "V16": 4.0,
  //   "V17": 15.0,
  //   "V18": -5.0,
  //   "V19": 6.0,
  //   "V20": 0.0,
  //   "V21": 1.0,
  //   "V22": 0.5,
  //   "V23": 3.0,
  //   "V24": 5.0,
  //   "V25": 7.0,
  //   "V26": 8.0,
  //   "V27": 10.0,
  //   "V28": 5.0,
  //   "Amount": 100000.0 // Montant plus élevé
  // };
    
  predictionPercentage: string = '';  // Déclarez cette propriété ici
  prediction: string = '';
  inputFields: string[] = [
    'Time', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 
    'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17', 'V18', 
    'V19', 'V20', 'V21', 'V22', 'V23', 'V24', 'V25', 'V26', 'V27', 'V28', 'Amount'
  ];

  fraudChart: any;
  @ViewChild('fraudChartCanvas', { static: false }) fraudChartCanvas: ElementRef;

  constructor(private predictionService: PredictionService) {}

  ngOnInit() {
    // Initial setup if needed
  }

  ngAfterViewInit() {
    // Si vous utilisez une bibliothèque de chart.js, vous devez utiliser setTimeout ou utiliser 
    // directement l'élément `canvas` une fois la vue complètement chargée.
    setTimeout(() => {
      this.createFraudDistributionChart();
    }, 0);
  }

  onSubmit(): void {
    this.predictionService.predict(this.inputData).subscribe({
      next: (response) => {
        const predictionValue = response.prediction;  // La prédiction entre 0 et 1
        console.log(predictionValue);
  
        // Mettre à jour la catégorie de la prédiction (Fraud ou Non-Fraud)
        this.prediction = predictionValue < 0.5 ? 'Non-Fraud' : 'Fraud';
  
        // Mettre à jour le pourcentage de la prédiction
        this.predictionPercentage = (predictionValue * 100).toFixed(2);  // Multiplie par 100 et garde 2 décimales
        console.log(this.prediction, this.predictionPercentage);
      },
      error: (err) => {
        console.error('Error:', err);
        this.prediction = 'An error occurred.';
      }
    });
  }
  

  createFraudDistributionChart() {
    // Vérifiez si l'élément canvas est défini
    if (this.fraudChartCanvas && this.fraudChartCanvas.nativeElement) {
      const ctx = this.fraudChartCanvas.nativeElement.getContext('2d');
      this.fraudChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Fraud', 'Non-Fraud'],
          datasets: [{
            data: [492, 284315], // Exemple basé sur la description des données
            backgroundColor: ['red', 'green'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found!');
    }
  }
}
