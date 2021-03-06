import { Component, OnInit } from "@angular/core";
import { Users } from "src/app/models/user.model";
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SecreteryService } from "src/app/services/secretery.service";
import { SelectionModel } from "@angular/cdk/collections";
import Swal from "sweetalert2";
import { RemoveMotherModalComponent } from "../remove-mother-modal/remove-mother-modal.component";
import { SecreteryComponentNewMother } from "../registrationMother/secretery.component.new.mother";
@Component({
  selector: "app-remove-mother",
  templateUrl: "./remove-mother.component.html",
  styleUrls: ["./remove-mother.component.css"],
})
export class RemoveMotherComponent  implements OnInit {
 
  sourceMothers: Users[] = [];
  mothers: Users[];
  dataSource: MatTableDataSource<Users>;
  constructor(
    private secreteryService: SecreteryService,
    public dialog: MatDialog
  ) {
  
    
  }
  filterName='';

  displayedColumns: string[] = [
    'Name',
    'Email',
    'Phone',
    'UserId',
    'DateOfBirth',
    'actions',
  ];
  
  compareObjects(o1: any, o2: any): boolean {
    return o1 === o2;
  }
  ngOnInit(): void {
  this.getMothers();
  }

  getMothers(){
    this.secreteryService.getAllMothers().subscribe(x=>{
      this.mothers =x;
      this.sourceMothers = Object.assign([], x);
      this.dataSource = new MatTableDataSource(this.mothers);
      this.dataSource.filterPredicate = 
      (data: Users, filter: string) => data.UserId.indexOf(filter) != -1;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  openModal(id: number) {
    const dialogRef = this.dialog.open(RemoveMotherModalComponent, {
      data: { id:id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getMothers( );
    });
  }
  openModalEdit(id: number) {
    const dialogRef = this.dialog.open(SecreteryComponentNewMother, {
      data: { id:id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getMothers( );
    });
  }
  

}
