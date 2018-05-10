import { Component, OnInit } from '@angular/core';
import { HostListener, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidatorFn} from '@angular/forms';
import { SoccerPitchService } from '../../soccer-pitch.service';
import { UsersService } from '../../users.service';
import { NotificationService } from '../../notification.service';

import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';



// import 'rxjs/Rx';

// Directions possibles
const up = 0;
const down = 1;

// Type de terrain
const halfPitch = 0;
const fullPitch = 1;


// type de rayures
const vertical = 0;
const horizontal = 1;
const oblic45 = 2;
const oblic135 = 3;
// type deduit si 2 equipes sont definis
// type calculé dependance :si nombre d'equipes = 2
const doubleTeamPitch = 2;
// object component
let obj = null;

// tslint:disable-next-line:one-line
export class Team{
    direction: number;
    id: number;
    name: string;
    teamColor: string;
    teamColorB: string;
    stripesType: number;
    numberOfStripes: number;
    textColor: string;
    players: any;
    constructor(props: any) {
        this.direction = parseInt(props.direction, 10);
        this.teamColor = props.teamColor;
        this.id = props.id;
        this.teamColorB = props.teamColorB;
        this.stripesType = parseInt(props.stripesType, 10);
        this.numberOfStripes = parseInt(props.numberOfStripes, 10);
        this.textColor = props.textColor;
        this.players = [];
  }
}

@Component({
  selector: 'app-soccer-pitch',
  templateUrl: './soccer-pitch.component.html',
  styleUrls: ['./soccer-pitch.component.css']
})
export class SoccerPitchComponent implements OnInit {
    closedPitch = false;
    @ViewChild('pitch') cnv;
    height: number;
    awayTeamId: number = null;
    homeTeamId: number = null;
    awayTeamName: string = null;
    homeTeamName: string = null;
    properties: any;
    game_id: number;
    defaultProps: any;
    editingMode = false;
    toggleButton = 'Mode Edition';
    saveObs: any;
    updateObs: any;
    delObs: any;
    ind: number;
    propsObs: any;
    delResp: any;
    saveResp: any;
    propsResp: any;
    // shiftY:number;
    showPlayerForm = false;
    mode = 'Ajout';
    bUpd1: boolean;
    bUpd2: boolean;
    isMouseDown: boolean;
    sqrDistBtwPl: number;
    bDoubleCk: boolean;
    iTimer: any = null;
    reactiveMenuForm: FormGroup;
    reactivePlayerForm: FormGroup;
    formTitle: string;
    isConfigMenuActive = false;
    sub;
    constructor(
            private route: ActivatedRoute, private router: Router,
            public soccerPitchDb: SoccerPitchService, public userSrv: UsersService,
            public notif: NotificationService
        ) {
         this.properties = {
            objid: '_sp_canvas_id_def',
            user: null,
            game_id: null,                                    // l'id de l'element canvas utilisateur (val par def: _sp_canvas_id_def)
            renderImgId: '_sp_img_id_def',               // l'id de l'image utilisateur pour le rendu (val par defaut: _sp_img_id_def)
            width: 320,                                 // Largeur de l'image representant le terrain (en pixels)
            rateHW: 1.32,                                // rapport Hauteur(Longueur)/largeur du terrain
                                                        // ==> hauteur=width*rateHW
            widthIRL: 60,                                // Largeur standard et reelle du terrain en m
                                                        // ==> permet de recreer l'echelle
            iconesFiles: {
                    ball: 'assets/img/but_12x12px.png',
                    yellowCard: 'assets/img/Carton_jaune_9x12px.png',
                    redCard: 'assets/img/carton_rouge_9x12px.png'
                },
            playerSize: 8,                              // Taille des joueurs en px
            lineWidth: 1,                               // Epaisseur des traits en px
            grassColor1: 'rgb(18, 53, 9)',                    // couleur de tonte 1 "#088A08"
            grassColor2: 'rgb(32, 82, 17)',                     // couleur de tonte 2 "#04B404"
            lineColor: 'rgb(116, 113, 113)',                    // grassColor1: "rgb(18, 53, 9)" , //couleur de tonte 1 "#088A08"
                                                                // grassColor2: "rgb(32, 82, 17)", //couleur de tonte 2 "#04B404"
                                                                // lineColor: "rgb(116, 113, 113)",
            shadow: true,                               // Ombre des joueurs: true ou false
            textStyle: 'bold 11px Muli',                   // style texte incrusté(nom)
            top: {x: 20, y: 20},                           // permet de dessiner un cadre exterieur : 0,0 pour supprimer le cadre
            cornerRadius: 1,                             // rayon des quarts de cercle du pt de corner en metres
            direction: up,                              // orientation du 1/2 terrain important
                                                        // si aucune equipe (aucun interet sinon calculé)
                                                        // Types possibles de representation:
            type: fullPitch,                            // halfPitch       :  1 demi-terrain,
                                                        // fullPitch :  1 grand terrain
            teams: [new Team({direction: up,            // ajout de 2 equipes sur le terrain
                            id: null,
                            teamColor: '#0000FF',
                            teamColorB: '#FF0000',       // couleurs rayures (couleurs identiques==> pas de rayures)
                            stripesType: vertical,      // rayure Verticales
                            numberOfStripes: 7,
                            textColor: '#FFFFFF'}),
                    new Team({direction: down,
                            id: null,
                            teamColor: '#FFFFFF',
                            teamColorB: '#FFFFFF',       // couleurs rayures
                            stripesType: horizontal,    // rayure Verticales
                            numberOfStripes: 6,
                            textColor: '#000000'})],
            configMenu: true,                           // par defaut on gere le parametrage via menu si ce flag est actif
            help: true,                                 // affichage du bouton aide ==> non implemente pour le moment gere dans configMenu
            grassStripesNumber: 11,                      // Nombre de bandes sur la pelouse( degradé de couleurs)
            sheetName: 'default'
        };
        this.defaultProps = this.properties;
        this.ind = 0;
        this.bUpd1 = false;
        this.bUpd2 = false;
        this.isMouseDown = false;
        this.bDoubleCk = false;
        this.formTitle = 'Configuration';
    }

    ngOnInit() {
        this.sub = this.route.params
            .subscribe((val) => {
                this.game_id = parseInt(val.id, 10);
                this.awayTeamId = parseInt(val.awayTeamId, 10);
                this.homeTeamId = parseInt(val.homeTeamId, 10);
                // this.awayTeamName=val.awayTeamName;
                // this.homeTeamName=val.homeTeamName;
                // console.log(val);
                console.log('OnInit');
                this.getSavedProperties();
                this.closedPitch = false;
                obj = this;

                this.reactiveMenuForm = new FormGroup({
                'type': new FormControl(this.properties.type),
                'teamsNumber': new FormControl(this.properties.teams.length, [Validators.min(1), Validators.max(2)]),
                'playerSize': new FormControl(this.properties.playerSize),
                'team1Color1':  new FormControl(this.properties.teams[0].teamColor),
                'team2Color1':  new FormControl(this.properties.teams[1].teamColor),
                'team1Color2':  new FormControl(this.properties.teams[0].teamColorB),
                'team2Color2':  new FormControl(this.properties.teams[1].teamColorB),
                'stripesTypeTeam1':  new FormControl(this.properties.teams[0].stripesType),
                'stripesTypeTeam2':  new FormControl(this.properties.teams[1].stripesType),
                'team1TextColor':  new FormControl(this.properties.teams[0].textColor),
                'team2TextColor':  new FormControl(this.properties.teams[1].textColor),
                'team1Direction':  new FormControl(this.properties.teams[0].direction.toString()),
                'team2Direction':  new FormControl(this.properties.teams[1].direction.toString()),
                'numberOfStripes1': new FormControl(this.properties.teams[0].numberOfStripes),
                'numberOfStripes2': new FormControl(this.properties.teams[1].numberOfStripes)
                });

                this.reactivePlayerForm = new FormGroup({
                    'playerName': new FormControl(null),
                    'goals': new FormControl(0, [Validators.min(0)]),
                    'yCards': new FormControl(0),
                    'rCards':  new FormControl(0),
                    'x': new FormControl(0),
                    'y': new FormControl(0),
                });

                this.onChanges();
                    // console.log(this.cnv.nativeElement);
                this.sqrDistBtwPl = Math.round(3 * this.properties.width / this.properties.widthIRL);
                this.sqrDistBtwPl *= Math.round(3 * this.properties.width / this.properties.widthIRL);
                setTimeout( () => {
                    this.draw();
                    this.cnv.nativeElement.addEventListener('click', this.addPlayerEvt);
                }, 0);
        });
    }
    closePitch() {
        this.closedPitch = true;
    }

    onChanges() {
        this.reactiveMenuForm.get('team1Direction').valueChanges.subscribe(val => {
            if (!this.bUpd1) {
                this.bUpd2 = true;
                this.reactiveMenuForm.get('team2Direction').patchValue((parseInt(val, 10) % 2 === 0) ? '1' : '0');
                this.bUpd2 = false;
            }
        });
        this.reactiveMenuForm.get('team2Direction').valueChanges.subscribe( val => {
            if (!this.bUpd2) {
                this.bUpd1 = true;
                this.reactiveMenuForm.get('team1Direction').patchValue((parseInt(val, 10) % 2 === 0) ? '1' : '0');
                this.bUpd1 = false;
            }
        });
    }

    saveProperties() {
        const props: any = {};
        if (this.properties.teams[up]) {
            if (this.properties.teams[up].hasOwnProperty('id')) {
                this.properties.teams[up].id = this.homeTeamId;
            }
        }
        if (this.properties.teams[down]) {
            if (this.properties.teams[down].hasOwnProperty('id')) {
                this.properties.teams[down].id = this.awayTeamId;
            }
        }
        for (const key in this.properties) {
            if ( this.properties.hasOwnProperty(key)) {
                props[key] = this.properties[key];
            }
        }
        props.user = this.userSrv.getConnectedUser();
        // console.log(this.properties);
        if (this.game_id) {
            props.game_id = this.game_id;
        }
        if (!props._id) {
            this.saveObs = this.soccerPitchDb.postProperties(props);
            this.saveObs.subscribe(resp => {
                this.saveResp = resp;
                this.notif.notify('Composition ajoutée avec succès', 'SUCCESS', 2000);
                this.propsResp.push(this.saveResp);
                },
                error => {
                    this.notif.notify('Erreur lors de l\'enregistrement', 'WARN', 2000);
                },
                () => {
                    console.log('Insert completed');
                }

            );
        } else {
            this.updateObs = this.soccerPitchDb.updateProperties(props)
                .subscribe((resp) => {
                    console.log(resp);
                    if (resp.ok) {
                        this.notif.notify('Composition Modifiée avec succès', 'SUCCESS', 2000);
                    }

                    },
                    (err) => {
                        console.log(err);
                        this.notif.notify('Erreur lors de l\'enregistrement', 'WARN', 2000);
                    },
                    () => {
                        console.log('Update completed');
                }
            );
        }
    }
    deleteProperties() {
        console.log(this.properties);
        if (this.userSrv.getConnectedUser() === this.properties.user) {
            console.log(this.properties._id);
            this.delObs = this.soccerPitchDb.deleteProperties(this.properties._id);
            this.delObs.subscribe(resp => {
                this.delResp = resp;
                if (this.delResp.n === 1 ) {
                    this.propsResp.splice(this.propsResp.findIndex(val => val._id === this.properties._id), 1);
                    this.previous();
                    this.notif.notify('Composition supprimée avec succès', 'SUCCESS', 2000);
                }else {
                    this.notif.notify('La Composition n\' a pu etre supprimée', 'WARN', 2000);
                }
                this.updateAll();
            });
        }
    }

    getSavedProperties() {
        const defaultProperties = this.properties;
        this.propsObs = this.soccerPitchDb.getProperties();
        this.propsObs.subscribe( resp => {
            this.propsResp = resp;
            if (this.propsResp) {
                if (this.propsResp.length > 0) {
                    const properties = this.propsResp.filter(val => val.game_id === this.game_id);
                    if (properties.length === 0) {
                        console.log('game_id introuvable');
                        this.properties = defaultProperties;
                        this.properties._id = null;
                        this.properties.sheetName = '';
                        this.raz();
                        this.notif.notify('Aucune compo trouvée pour le match.', 'INFO', 2000);
                    }else {
                        console.log('game_id trouvé');
                        this.ind = this.propsResp.indexOf(properties[0]);
                        this.properties = this.propsResp[this.ind];
                        this.notif.notify('Composition du match ' + this.game_id + ' trouvée', 'SUCCESS', 2000);
                        // console.log(this.properties);
                    }
                    // console.log(this.propsResp);
                }else {
                    this.properties = defaultProperties;
                }
            }else {
                this.properties = defaultProperties;
            }
            this.updateAll();
            this.updatePicture();
               // if (this.properties.type==halfPitch || this.properties.type != doubleTeamPitch) this.direction = props.teams[0].direction
        });
    }
    updateAll() {
        if (this.properties.type === doubleTeamPitch) { this.properties.type = fullPitch; }
        this.reactiveMenuForm.get('type').patchValue(this.properties.type);
        this.reactiveMenuForm.get('teamsNumber').patchValue(this.properties.teams.length);
        this.reactiveMenuForm.get('playerSize').patchValue(this.properties.playerSize);
        this.reactiveMenuForm.get('team1Color1').patchValue(this.properties.teams[0].teamColor);
        this.reactiveMenuForm.get('team2Color1').patchValue(this.properties.teams[1].teamColor);
        this.reactiveMenuForm.get('team1Color2').patchValue(this.properties.teams[0].teamColorB);
        this.reactiveMenuForm.get('team2Color2').patchValue(this.properties.teams[1].teamColorB);
        this.reactiveMenuForm.get('stripesTypeTeam1').patchValue(this.properties.teams[0].stripesType);
        this.reactiveMenuForm.get('stripesTypeTeam2').patchValue(this.properties.teams[1].stripesType);
        this.reactiveMenuForm.get('team1TextColor').patchValue(this.properties.teams[0].textColor);
        this.reactiveMenuForm.get('team2TextColor').patchValue(this.properties.teams[1].textColor);
        this.reactiveMenuForm.get('team1Direction').patchValue(this.properties.teams[0].direction.toString());
        this.reactiveMenuForm.get('team2Direction').patchValue(this.properties.teams[1].direction.toString());
        this.reactiveMenuForm.get('numberOfStripes1').patchValue(this.properties.teams[0].numberOfStripes);
        this.reactiveMenuForm.get('numberOfStripes2').patchValue(this.properties.teams[1].numberOfStripes);
        if (this.properties.teams.length === 2) { this.properties.type = doubleTeamPitch; }
        this.cnv.nativeElement.setAttribute('title',
            this.properties.user + ' - ' + this.properties.sheetName + ' - ' + this.properties._id);
        this.updatePicture();
    }
    previous() {
        if (this.ind === 0) {
            this.ind = 0;
        }else {
            this.ind--;
        }
        this.properties = this.propsResp[this.ind];
        this.updateAll();
    }
    next() {
        if (this.ind === this.propsResp.length - 1) {
            this.ind = this.propsResp.length - 1;
        }else {
            this.ind++;
        }
        this.properties = this.propsResp[this.ind];
        this.updateAll();
    }

    toggleEdition() {
        this.editingMode = !this.editingMode;
        this.toggleButton = (this.editingMode) ? 'Mode Ajout' : 'Mode Edition';
        this.mode = (this.editingMode) ? 'Edition' : 'Ajout';
    }
// Raffraichissement Image
    updatePicture = function() {
        let cntUp;
        let cntDn;
        this.draw();
        const canv = this.cnv.nativeElement;
        if (this.properties.teams[up]) {
            cntUp = this.properties.teams[up].players.length;
        } else {
            cntUp = 0;
        }
        if (this.properties.teams[down]) {
            cntDn = this.properties.teams[down].players.length;
        } else {
            cntDn = 0;
        }
        for ( let i = 0; i < cntUp ; i++ ) {
            this.drawPlayer(this.properties.teams[up].players[i], up );
            this.writePlayer(this.properties.teams[up].players[i]);
        }
        for ( let i = 0; i < cntDn ; i++ ) {
            this.drawPlayer(this.properties.teams[down].players[i], down);
            this.writePlayer(this.properties.teams[down].players[i]);
        }
    };

     // recommencer de zero
     raz = function(){
        if (this.properties.type === doubleTeamPitch) {
            if (this.properties.teams) {
                this.properties.teams[up].players = [];
                this.properties.teams[down].players = [];
            }
        } else {
            this.properties.teams[this.properties.direction].players = [];
        }
        this.draw();
    };

    newP() {
        this.propsResp.push(this.defaultProps);
        this.ind = this.propsResp.length - 1;
        this.properties = this.propsResp[this.ind];
        this.properties.sheetName = '';
        this.properties._id = null;
        this.properties.user = this.userSrv.getConnectedUser();
        this.updateAll();
    }


    writePlayer = function (player){
        const canvas = this.cnv.nativeElement;
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        context.lineWidth = 2;
        context.fillStyle = this.properties.teams[this.getDirection(player.y)].textColor;
        context.font = this.properties.textStyle;
        context.textAlign = 'center';
        if (this.getDirection(player.y) === down) {
            context.fillText( player.name, player.x, ( player.y - (this.properties.playerSize * 1.5)));
        } else {
            context.fillText( player.name, player.x, ( player.y + (this.properties.playerSize * 2)));
        }
    };
    onValidateConfig() {
        this.properties.type = this.reactiveMenuForm.value.type;
        this.properties.playerSize = parseInt(this.reactiveMenuForm.value.playerSize, 10);
    //   if (this.properties.teams.length<this.reactiveMenuForm.value.teamsNumber){
    //       this.properties.teams.push(new team({this.reactiveMenuForm.value}));
    //   }

        this.properties.teams[0].teamColor = this.reactiveMenuForm.value.team1Color1;
        this.properties.teams[0].teamColorB = this.reactiveMenuForm.value.team1Color2;
        this.properties.teams[0].stripesType = parseInt(this.reactiveMenuForm.value.stripesTypeTeam1, 10);
        this.properties.teams[0].textColor = this.reactiveMenuForm.value.team1TextColor;
        this.properties.teams[0].direction = parseInt(this.reactiveMenuForm.value.team1Direction, 10);
        this.properties.teams[0].numberOfStripes = parseInt(this.reactiveMenuForm.value.numberOfStripes1, 10);

        this.properties.teams[1].teamColor = this.reactiveMenuForm.value.team2Color1;
        this.properties.teams[1].teamColorB = this.reactiveMenuForm.value.team2Color2;
        this.properties.teams[1].stripesType = parseInt(this.reactiveMenuForm.value.stripesTypeTeam2, 10);
        this.properties.teams[1].textColor = this.reactiveMenuForm.value.team2TextColor;
        this.properties.teams[1].direction = parseInt(this.reactiveMenuForm.value.team2Direction, 10);
        this.properties.teams[1].numberOfStripes = parseInt(this.reactiveMenuForm.value.numberOfStripes2, 10);
        // console.log(this.reactiveMenuForm.value);
        // console.log(this.properties);
        if (this.properties.teams.length === 2) {
            this.properties.type = doubleTeamPitch;
        }
        this.updatePicture();
        this.isConfigMenuActive = false;
    }
    onValidatePlayer() {
        const indPl = this.findSelClkPlayer(this.reactivePlayerForm.value.x, this.reactivePlayerForm.value.y);
        // console.log(indPl);
        // console.log(this.properties.teams);
        this.properties.teams[
            this.getDirection(this.reactivePlayerForm.value.y)
        ].players[indPl].name = this.reactivePlayerForm.value.playerName;

        this.properties.teams[
            this.getDirection(this.reactivePlayerForm.value.y)
        ].players[indPl].goals = this.reactivePlayerForm.value.goals;
        this.properties.teams[
            this.getDirection(this.reactivePlayerForm.value.y)
        ].players[indPl].ycards = this.reactivePlayerForm.value.yCards;
        this.properties.teams[
            this.getDirection(this.reactivePlayerForm.value.y)
        ].players[indPl].rcards = this.reactivePlayerForm.value.rCards;
        this.updatePicture();
        this.showPlayerForm = false;
    }
    closePlayerForm() {
        this.showPlayerForm = false;
    }
    draw() {
        const canvas = this.cnv.nativeElement;
        // largeur des bandes de couleurs de pelouse
        this.height = this.properties.width * this.properties.rateHW;
        const bandWth = this.height / this.properties.grassStripesNumber;

        let yend;
        // point de coupe pour demi terrain: 2/3 de la hauteur offre un bon rendu
        const cutPt = 2 / 3;
        // les valeurs de x et y redondantes dans les calculs
        // prenons soin du processeur
        const xcenter = this.properties.top.x + (this.properties.width / 2);

        if ( this.properties.type === halfPitch ) {
            yend = this.properties.top.y + Math.round(this.height * cutPt);
            if ( this.properties.direction === up ) {
                yend = Math.round(this.height * cutPt);
            }
        } else {
            yend = this.properties.top.y + this.height;
        }
        const xend = this.properties.top.x + this.properties.width;

        let ycenter ;
        // console.log('props.width',this.properties.width);
        // console.log('height',this.height);
        // console.log('xend',xend);
        // console.log('yend',yend);

        if (this.properties.type === halfPitch && this.properties.direction === up) {
            ycenter = Math.round((this.height * cutPt)  - this.height / 2);
        } else {
            ycenter = Math.round(this.properties.top.y + (this.height / 2));
        }


       // console.log(ycenter);
        const scaleMetersPx = this.properties.width / this.properties.widthIRL;

        // pour eviter ques les buts depassent du canevas
        let scaleMetersGoalPx;
        if (2.44 * scaleMetersPx > this.properties.top.y) {
            scaleMetersGoalPx = (this.properties.top.y / 2.44) - 2;
        } else { scaleMetersGoalPx = scaleMetersPx; }

        // largeur du terrain + cadre:
        canvas.width = this.properties.width + (this.properties.top.x * 2);
        if (this.properties.type === halfPitch) {
            canvas.height = Math.round((this.height * cutPt) + (this.properties.top.y));
        } else {
            canvas.height = (this.height) + (this.properties.top.y * 2);
        }

        // rayon du rond central
        // et rayon de l'arc autour du point de penalty
        const centralCircleRad = (9.15 * (this.properties.width / this.properties.widthIRL));
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        context.strokeStyle = this.properties.lineColor;
        context.lineWidth = this.properties.lineWidth;
        context.fillStyle = this.properties.grassColor1;
        // console.log(this.properties);
        // console.log(this.properties.type==halfPitch);
        if (this.properties.type === halfPitch ) {
            context.fillRect(0, 0, this.properties.width + (this.properties.top.x * 2),
            (this.height * 2 / 3 ) + (this.properties.top.y * 2) );
        } else {
            context.fillRect(0, 0, this.properties.width + (this.properties.top.x * 2),
            (this.height) + (this.properties.top.y * 2) );
        }
        let tmpY;
        if (this.properties.type === halfPitch && this.properties.direction === up) {
            tmpY = this.height * cutPt - bandWth ;
        } else {
            tmpY = this.properties.top.y;
        }

        for (let i = 0; i < this.properties.grassStripesNumber; i++) {
            if ( i % 2 === 0 ) {
                context.fillStyle = this.properties.grassColor2;
            } else {
                context.fillStyle = this.properties.grassColor1;
            }
            context.fillRect(this.properties.top.x, tmpY, this.properties.width, bandWth );
            if (this.properties.type === halfPitch && this.properties.direction === up) {
                tmpY = tmpY - bandWth;
            } else {
                tmpY = tmpY + bandWth;
            }
        }

        // contour exterieur
        context.beginPath();
        if (this.properties.type === halfPitch && this.properties.direction === down) {
            context.rect(this.properties.top.x, this.properties.top.y, this.properties.width, yend);
        }else if (this.properties.type === halfPitch && this.properties.direction === up) {
            context.rect(this.properties.top.x, 0, this.properties.width, yend);
        }else {
            context.rect(this.properties.top.x, this.properties.top.y, this.properties.width, this.height);
        }
        context.stroke();
        // Mediane
        context.beginPath();
        context.moveTo(this.properties.top.x, ycenter);
        context.lineTo(xend, ycenter);
        context.stroke();

        // Rond central
        context.beginPath();
        context.arc(xcenter, ycenter, centralCircleRad, 0, 2 * Math.PI);
        context.stroke();
        // centre
        context.beginPath();
        context.arc(xcenter, ycenter, this.properties.lineWidth / 2, 0, 2 * Math.PI);
        context.stroke();

        if (this.properties.type !== halfPitch || this.properties.direction === down) {
            // surface des 16.5m haut
            context.beginPath();
            context.moveTo(xcenter + (20.15 * scaleMetersPx), this.properties.top.y);
            context.lineTo(xcenter + (20.15 * scaleMetersPx), this.properties.top.y + (16.5 * scaleMetersPx) );
            context.lineTo(xcenter - (20.15 * scaleMetersPx), this.properties.top.y + ( 16.5 * scaleMetersPx ));
            context.lineTo(xcenter - (20.15 * scaleMetersPx), this.properties.top.y );
            context.stroke();

            // surface des 5.5m haut
            context.beginPath();
            context.moveTo(xcenter + (9.15 * scaleMetersPx), this.properties.top.y);
            context.lineTo(xcenter + (9.15 * scaleMetersPx), this.properties.top.y + (5.5 * scaleMetersPx) );
            context.lineTo(xcenter - (9.15 * scaleMetersPx), this.properties.top.y + (5.5 * scaleMetersPx));
            context.lineTo(xcenter - (9.15 * scaleMetersPx), this.properties.top.y );
            context.stroke();

            // pt penalty haut
            context.beginPath();
            context.arc(xcenter, this.properties.top.y + (11 * scaleMetersPx), this.properties.lineWidth / 2, 0, 2 * Math.PI);
            context.stroke();

            // arc surface haut
            context.beginPath();
            context.arc(xcenter, this.properties.top.y + (11 * scaleMetersPx), centralCircleRad, Math.PI / 5, (4 * Math.PI / 5));
            context.stroke();
            // buts haut
            context.beginPath();
            context.moveTo(xcenter - (3.66 * scaleMetersPx), this.properties.top.y);
            context.lineTo(xcenter - (3.66 * scaleMetersPx), this.properties.top.y - (2.44 * scaleMetersGoalPx));
            context.lineTo(xcenter + (3.66 * scaleMetersPx), this.properties.top.y - (2.44 * scaleMetersGoalPx));
            context.lineTo(xcenter + (3.66 * scaleMetersPx), this.properties.top.y);
            context.stroke();

            // corners hauts
            context.beginPath();
            context.arc(this.properties.top.x, this.properties.top.y, this.properties.cornerRadius * scaleMetersPx, 0, Math.PI / 2);
            context.stroke();
            context.beginPath();
            context.arc(xend, this.properties.top.y, this.properties.cornerRadius * scaleMetersPx, Math.PI / 2, Math.PI);
            context.stroke();
        }
        if (this.properties.direction === up || this.properties.type !== halfPitch ) {
            // surface des 16.5m bas
            context.beginPath();
            context.moveTo(xcenter + (20.15 * scaleMetersPx), yend);
            context.lineTo(xcenter + (20.15 * scaleMetersPx), yend - (16.5 * scaleMetersPx) );
            context.lineTo(xcenter - (20.15 * scaleMetersPx), yend - (16.5 * scaleMetersPx ));
            context.lineTo(xcenter - (20.15 * scaleMetersPx), yend);
            context.stroke();


            // surface des 5.5m bas
            context.beginPath();
            context.moveTo(xcenter + (9.15 * scaleMetersPx), yend);
            context.lineTo(xcenter + (9.15 * scaleMetersPx), yend - (5.5 * scaleMetersPx) );
            context.lineTo(xcenter - (9.15 * scaleMetersPx), yend - (5.5 * scaleMetersPx ));
            context.lineTo(xcenter - (9.15 * scaleMetersPx), yend);
            context.stroke();

            // pt penalty bas
            context.beginPath();
            context.arc(xcenter, yend - (11 * scaleMetersPx), this.properties.lineWidth / 2, 0, 2 * Math.PI);
            context.stroke();

            // arc surface bas
            context.beginPath();
            context.arc(xcenter, yend - (11 * scaleMetersPx), centralCircleRad, (6 * Math.PI / 5), 9 * Math.PI / 5);
            context.stroke();

            // buts bas
            context.beginPath();
            context.moveTo(xcenter - (3.66 * scaleMetersPx), yend );
            context.lineTo(xcenter - (3.66 * scaleMetersPx), yend + (2.44 * scaleMetersGoalPx));
            context.lineTo(xcenter + (3.66 * scaleMetersPx), yend + (2.44 * scaleMetersGoalPx));
            context.lineTo(xcenter + (3.66 * scaleMetersPx), yend);
            context.stroke();

            // les pts de corner du bas
            context.beginPath();
            context.arc(this.properties.top.x, yend, this.properties.cornerRadius * scaleMetersPx, 3 * Math.PI / 2, 0);
            context.stroke();
            context.beginPath();
            context.arc(xend, yend, this.properties.cornerRadius * scaleMetersPx, Math.PI, 3 * Math.PI / 2);
            context.stroke();
        }
    }
    drawPlayer(player, dir) {
        const cnv = this.cnv.nativeElement;
        const imgGl = new Image();
        const imgYc = new Image();
        const imgRc = new Image();

        imgGl.src = this.properties.iconesFiles.ball;
        imgYc.src = this.properties.iconesFiles.yellowCard;
        imgRc.src = this.properties.iconesFiles.redCard;
        const context = cnv.getContext('2d');

        // si ombre activee
        if (this.properties.shadow === true) {
            context.shadowBlur = 5;
            context.shadowColor = 'black';
        }

        const nbStr = this.properties.teams[dir].numberOfStripes;
        let symetricAxisAngle, angle, symetricAngle;
        const R = this.properties.playerSize;
        // Explication de cet algo, appliqué
        // au comportement de la fonction du canvas arc pour la mise en place des rayures verticales ou
        // horizontales des maillots:
        //
        // Les bandes correspondent, en fait, aux remplissage des arcs perpendiculaires au axes de symetries  d'angle
        // PI/2(rayures horizontales) ou PI (Axe de symetrie pour les rayures verticales) ou autres etc...
        //
        // Pour cela, on initialise l'axe de symetrie en fonction de l'orientation des rayures du maillot.
        // Et pour avoir les angles de debut et de fin (pour dessiner l'arc) , il suffit alors d'ajouter à la variable angle,
        // l'angle PI/(nb de Bandes) et de le retrancher à cette même variable (angle) cela remplira la partie complementaire
        // d'arc symetrique à l'axe choisi  en décalant on obtiendra au final les bandes alternées

        // On peut donc obtenir comme ça toutes les orientations de bandes
        // possibles (notamment pour creer des rayures à 45° il suffit de prendre la valeur (PI/4 + PI/2)
        // comme axe (symetricAxisAngle).
        if (this.properties.teams[dir].teamColor !== this.properties.teams[dir].teamColorB) {
            switch (this.properties.teams[dir].stripesType) {
                case horizontal:
                    symetricAxisAngle = Math.PI / 2;
                    break;
                case vertical:
                    symetricAxisAngle = Math.PI;
                    break;
                case oblic45:
                    symetricAxisAngle = 3 * Math.PI / 4;
                    break;
                case oblic135:
                    symetricAxisAngle = Math.PI / 4;
                    break;
            }

            angle = 0;
            symetricAngle =  0;
            // x represente la coordonnée horizontal de l'angle on calculera alors la valeur du cosinus
            // en divisant la partie interne de l'axe horizontal du cercle
            // par le nombre de stries : ensuite on obtiendra alors les angles voulus en calculant
            // l'arc cosinus de x
            let x = player.x - R + ( R / ( nbStr / 2));

            for (let i = 0; i < nbStr; i++) {

                context.beginPath();
                if (i % 2 === 0) {
                    context.fillStyle = this.properties.teams[dir].teamColor;
                } else {
                    context.fillStyle = this.properties.teams[dir].teamColorB;
                }
                if (i === 0) {
                    context.arc(player.x, player.y, R, 0, 2 * Math.PI);
                } else {
                    context.arc(player.x, player.y, R, angle, symetricAngle);
                }
                angle = Math.acos((player.x - x) / R) - symetricAxisAngle;
                symetricAngle = -Math.acos((player.x - x) / R) - symetricAxisAngle;
                x += R / (nbStr / 2);
                context.fill();
            }
            // alternative
            /*for ( let i=0 ; i<nbStr; i++){
                context.beginPath();
                //alternance des couleurs
                if (i%2==0){
                    context.fillStyle=this.teams[dir].teamColor;
                }else{
                    context.fillStyle=this.teams[dir].teamColorB;
                }

                if (i==0){
                    //le 1er arc est le cercle entier
                    //rempli avec la premiere couleur
                    context.arc(player.x, player.y, this.playerSize, 0, 2*Math.PI);
                }
                else {
                    //les autres arcs sont les arcs d'angles diminués de Math.PI/nbBnd d'un coté de l'axe
                    //de symetrie et augmentés de l'autre coté, pour former par decalage les stries.
                    //celles ci apparaitront donc intégralement à la fin de la boucle.
                    context.arc(player.x, player.y, this.playerSize, angle, symetricAngle);
                }
                angle+= Math.PI/nbStr;
                symetricAngle -= Math.PI/nbStr;
                context.fill();
            }*/
        } else {
            context.beginPath();
            // context.strokeStyle=null;
            context.fillStyle = this.properties.teams[dir].teamColor;
            context.arc(player.x, player.y, this.properties.playerSize, 0, 2 * Math.PI);
            context.fill();
        }

        // les bras

        context.strokeStyle = this.properties.teams[dir].teamColor;
        context.beginPath();
        context.lineWidth = this.properties.playerSize  * 0.8;
        context.moveTo(player.x - this.properties.playerSize * 1.5, player.y);
        context.lineTo(player.x - this.properties.playerSize - 1, player.y);
        context.moveTo(player.x + this.properties.playerSize * 1.5, player.y);
        context.lineTo(player.x + this.properties.playerSize + 1, player.y);
        context.stroke();

        // les tetes en noir
        context.beginPath();
        if ( this.properties.shadow === true ) {
            context.shadowBlur = 0;
        }
        context.lineWidth = 1;
        context.fillStyle = 'black';
        context.arc(player.x, player.y, (this.properties.playerSize * 0.5), 0, 2 * Math.PI);
        context.fill();

        // incrustation des images buts, cartons
        const shiftDist = this.properties.playerSize;
        obj = this;
        imgGl.onload = function(){
            let startX;
            startX = Math.round(player.x - 6 - 12 * (player.goals - 1) / 2);
            for (let i = 0; i < player.goals; i++) {
                if ( dir === down ) {
                    context.drawImage(imgGl, 0, 0, 12, 12, startX + 12 * i, player.y + shiftDist * 1.5, 12, 12 );
                } else {
                    context.drawImage(imgGl, 0, 0, 12, 12, startX + 12 * i, player.y - shiftDist * 2.3, 12, 12 );
                }
            }
        };
        imgYc.onload = function(){
            for (let i = 0; i < player.ycards; i++) {
                const X1 = player.x - 12 - 2 * shiftDist * (i + 1);
                const X2 = player.x + 2  * shiftDist * (i + 1);
                if (dir === down) {
                    context.drawImage(imgYc, 0, 0, 9, 12, X1, (player.y - 6), 9, 12 );
                } else {
                    context.drawImage(imgYc, 0, 0, 9, 12, X2, (player.y - 6), 9, 12 );
                }
            }
        };
        imgRc.onload = function(){
            for (let i = 0; i < player.rcards; i++) {
                const X1 = player.x + 2 * shiftDist * (i + 1);
                const X2 = player.x - 9 - 2 * shiftDist * (i + 1);
                if (dir === down) {
                    context.drawImage(imgRc, 0, 0, 9, 12, X1, (player.y - 6), 9, 12 );
                } else {
                    context.drawImage(imgRc, 0, 0, 9, 12, X2, (player.y - 6), 9, 12 );
                }
            }
        };
        context.closePath();
    }

    addPlayer(X, Y, dir) {
        X = Math.round(X); Y = Math.round(Y);
        const scale = this.properties.widthIRL / this.properties.width;
        if (this.properties.type !== halfPitch) {
            this.properties.teams[dir].players.push({
                        x: Math.round(X), y: Math.round(Y),
                        name: '', goals: 0, ycards: 0, rcards: 0,
                        meterX: (X - this.properties.top.x) * scale, meterY: (Y - this.properties.top.y) * scale
            });
        }else {
            if (dir === up) {
                this.properties.teams[dir].players.push({
                        x: Math.round(X), y: Math.round(Y),
                        name: '', goals: 0, ycards: 0, rcards: 0,
                        meterX:  (X - this.properties.top.x) * scale, meterY: (Y * scale)
                });
            }
            if (dir === down) {
                this.properties.teams[dir].players.push({
                        x: Math.round(X), y: Math.round(Y),
                        name: '', goals: 0, ycards: 0, rcards: 0,
                        meterX: (X - this.properties.top.x) * scale, meterY: (Y - this.properties.top.y) * scale
                });
            }
        }
    }
    closeForm() {
        this.isConfigMenuActive = false;
    }
    showForm() {
        this.isConfigMenuActive = true;
    }
    getDirection= function (y) {
        // console.log('type',this.properties.type);
        if (this.properties.type === doubleTeamPitch) {
            if ( y < (this.height / 2 + this.properties.top.y) ) {
                return down;
            } else {
                return up;
            }
        }else {
            return this.properties.direction;
        }
    };

    findSelClkPlayer = function (x, y){
        let d;
        if (this.properties.teams) {
            if (this.properties.teams.length > 0) {
                if (this.properties.teams[up]) {
                    for ( let ind = 0; ind < this.properties.teams[up].players.length; ind++ ) {
                        d = (x - this.properties.teams[up].players[ind].x) * (x - this.properties.teams[up].players[ind].x)
                          + (y - this.properties.teams[up].players[ind].y) * (y - this.properties.teams[up].players[ind].y);
                        if ( d < this.sqrDistBtwPl) {
                            return ind;
                        }
                    }
                }
                if (this.properties.teams[down]) {
                    for (let i = 0; i < this.properties.teams[down].players.length; i++ ) {
                        d = (x - this.properties.teams[down].players[i].x) * (x - this.properties.teams[down].players[i].x)
                          + (y - this.properties.teams[down].players[i].y) * (y - this.properties.teams[down].players[i].y);
                        if ( d < this.sqrDistBtwPl) {
                            return i;
                        }
                    }
                }
            }
        }
        return -1;
    };
    onRemovePlayer() {
        this.removePlayer(this.reactivePlayerForm.value.x, this.reactivePlayerForm.value.y);
        this.showPlayerForm = false;
    }
    removePlayer = function(x, y){
        const indice = this.findSelClkPlayer(x, y);
        if (indice > -1) {
            this.properties.teams[this.getDirection(y)].players.splice(indice, 1);
        }
        this.updatePicture();
    };

    calculateOffsets() {
        let elts = this.cnv.nativeElement;
        const offsetLeft = this.cnv.nativeElement.offsetLeft;
        const offsetTop = this.cnv.nativeElement.offsetTop;
        let totalOffsetLeft = offsetLeft;
        let totalOffsetTop = offsetTop;
        while (elts = elts.offsetParent) {
            totalOffsetLeft += elts.offsetLeft;
            totalOffsetTop += elts.offsetTop;
        }
        return {offsetLeft: totalOffsetLeft, offsetTop: totalOffsetTop};
    }

    addPlayerEvt(e) {
        const shift = obj.calculateOffsets();
        const cX = e.pageX - shift.offsetLeft;
        const cY = e.pageY - shift.offsetTop;

        if (!obj.editingMode) {
            obj.isMouseDown = false;
            obj.bDoubleCk = false;
            obj.iTimer = setTimeout( () => {
                if ( !obj.bDoubleCk) {
                    if (obj.findSelClkPlayer(cX, cY) === -1) {
                        if (obj.properties.teams[obj.getDirection(cY)].players.length < 11) {
                            obj.addPlayer(cX, cY, obj.getDirection(cY));
                            obj.drawPlayer({x: cX, y: cY, goals: 0, ycards: 0, rcards: 0}, obj.getDirection(cY));
                        }else {
                            obj.notif.notify('Attention: nombre maximum de joueurs atteint', 'INFO', 2000);
                        }
                    }
                }
            }, 300);
        }else {
            obj.showPlayerForm = true;
            const indPl = obj.findSelClkPlayer(cX, cY);
            if (indPl > -1) {
                obj.reactivePlayerForm.get('x').patchValue(obj.properties.teams[obj.getDirection(cY)].players[indPl].x);
                obj.reactivePlayerForm.get('y').patchValue(obj.properties.teams[obj.getDirection(cY)].players[indPl].y);
                obj.reactivePlayerForm.get('playerName').patchValue(obj.properties.teams[obj.getDirection(cY)].players[indPl].name);
                obj.reactivePlayerForm.get('goals').patchValue(obj.properties.teams[obj.getDirection(cY)].players[indPl].goals);
                obj.reactivePlayerForm.get('yCards').patchValue(obj.properties.teams[obj.getDirection(cY)].players[indPl].ycards);
                obj.reactivePlayerForm.get('rCards').patchValue(obj.properties.teams[obj.getDirection(cY)].players[indPl].rcards);
            }else {
                if (obj.properties.teams[obj.getDirection(cY)].players.length < 11) {
                    obj.addPlayer(cX, cY, obj.getDirection(cY));
                    obj.drawPlayer({x: cX, y: cY, goals: 0, ycards: 0, rcards: 0}, obj.getDirection(cY));
                }else {
                    obj.notif.notify('Attention: nombre maximum de joueurs atteint', 'INFO', 2000);
                }
                obj.reactivePlayerForm.get('x').patchValue(cX);
                obj.reactivePlayerForm.get('y').patchValue(cY);
                obj.reactivePlayerForm.get('playerName').patchValue('');
                obj.reactivePlayerForm.get('goals').patchValue('0');
                obj.reactivePlayerForm.get('yCards').patchValue('0');
                obj.reactivePlayerForm.get('rCards').patchValue('0');
            }
        }
    }

}
