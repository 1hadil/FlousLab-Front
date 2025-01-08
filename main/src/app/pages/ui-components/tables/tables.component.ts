import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { UserService } from 'src/app/services/UserService';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MaterialModule,
    NgxChartsModule,
  ],
  templateUrl: './tables.component.html',
  styles: [
    `
   .filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px; /* Espace entre les sections gauche et droite */
}

.left-filters, .right-filters {
  display: flex;
  align-items: center;
}

mat-form-field {
  width: 250px; /* Taille plus petite pour les champs */
  margin-right: 20px; /* Espacement entre les éléments */
}

.statistics-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-box {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-box mat-icon {
  font-size: 48px;
  color: #3f51b5;
}

.stat-box h3 {
  font-size: 18px;
  color: #333;
}

.stat-box p {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.chart-container {
  margin-top: 20px;
}

.chart-placeholder {
  width: 100%;
  height: 200px;
  background-color: #f1f1f1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 18px;
}


mat-select, input {
  font-size: 14px; /* Réduit la taille de texte dans les champs */
}

    `,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppTablesComponent implements OnInit {
  userStats = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 50 },
    { name: 'Mar', value: 70 },
    { name: 'Apr', value: 40 },
    { name: 'May', value: 90 }
  ];

  colorScheme = {
    domain: ['#5AA454', '#A10D2D', '#C7B42C', '#AAAAAA'] // Définir les couleurs
  };
  displayedColumns: string[] = ['photo', 'name', 'surname', 'email', 'job', 'cin', 'actions'];
  dataSource: any[] = [];
  searchQuery: string = ''; // Texte de recherche
  selectedJob: string = ''; // Job sélectionné
  uniqueJobs: string[] = []; // Liste des jobs uniques
  statistics = {
    totalUsers: 0
  };
 
  // Formulaire d'ajout d'un utilisateur
  newUser: any = {
    name: '',
    surname: '',
    email: '',
    job: '',
    cin: ''
  };
  showAddForm = false;

  constructor(private http: HttpClient,private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.loadUserStatistics();
  }
// Méthode pour charger les statistiques
// Méthode pour charger les statistiques
loadUserStatistics(): void {
  this.userService.getUserCount().subscribe(
    (count) => {
      this.calculateStatistics(count);
    },
    (error) => {
      console.error('Erreur lors de la récupération du nombre d\'utilisateurs', error);
    }
  );
}
  // Récupère les utilisateurs depuis l'API
  fetchUsers(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:8087/user/getAll', { headers }).subscribe(
      (data: any[]) => {
        this.dataSource = data.map((user) => ({
          ...user,
          isEditing: false,
        }));
        this.uniqueJobs = Array.from(new Set(data.map((user) => user.job))).filter((job) => job); // Extraire les jobs uniques
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }
  // Méthode pour calculer les statistiques
  calculateStatistics(count: number): void {
    const totalUsers = count;
    // Vous pouvez ajouter d'autres statistiques ici selon vos besoins

    this.statistics = {
      totalUsers
    };
  }
  
  // Applique les filtres sur le tableau
  applyFilter(): void {
    const filteredData = this.dataSource.filter((user) => {
      const matchesJob = this.selectedJob ? user.job === this.selectedJob : true;
      const matchesSearch = this.searchQuery
        ? user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      return matchesJob && matchesSearch;
    });
    this.dataSource = filteredData;
  }

  // Réinitialise les filtres
  resetFilters(): void {
    this.searchQuery = '';
    this.selectedJob = '';
    this.fetchUsers(); // Recharge les données initiales
  }

  // Toggle add user form visibility
  toggleAddUserForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  // Add a new user
  addUser(): void {
    if (!this.newUser.name || !this.newUser.surname || !this.newUser.email) {
      console.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:8087/user/add', this.newUser, { headers }).subscribe(
      (response) => {
        console.log('Utilisateur ajouté avec succès:', response);
        this.dataSource.push(response);  // Ajoute l'utilisateur à la liste localement
        this.newUser = {};  // Réinitialise le formulaire
        this.fetchUsers();  // Ou vous pouvez appeler cette méthode si vous préférez récupérer les utilisateurs à partir de l'API à nouveau
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    );
  }

  // Edit user
  editUser(user: any): void {
    user.isEditing = true;
  }

  // Save user changes
  saveUser(user: any): void {
    const updatedUser = { ...user };

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(`http://localhost:8087/user/update`, updatedUser, { headers }).subscribe(
      (response) => {
        console.log('Utilisateur modifié avec succès:', response);
        this.fetchUsers();
      },
      (error) => {
        console.error('Erreur lors de la modification de l\'utilisateur:', error);
      }
    );
    user.isEditing = false;
  }

  // Cancel edit
  cancelEdit(user: any): void {
    user.isEditing = false;
  }

  // Delete user
  deleteUser(userId: number): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`http://localhost:8087/user/delete/${userId}`, { headers }).subscribe(
      (response) => {
        console.log('Utilisateur supprimé avec succès:', response);
        this.fetchUsers();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      }
    );
  }
}
