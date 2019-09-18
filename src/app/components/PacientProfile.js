import React, {Component} from 'react';
import {Grid,Row,Col,Button,Image,Well,FormGroup,ControlLabel,Collapse,Radio} from 'react-bootstrap';
import {Toaster,Intent} from '@blueprintjs/core';
import FieldGroup from './FieldGroup';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import XLSX from 'xlsx';
import saveAs from 'file-saver';
import jspdf from 'jspdf'

class PacientProfile extends Component{

    _isMounted = false;
    _isMounted2 = false;
    _isMounted3 = false;

    constructor(props){
        super(props);
        this.state = {
            editable:true,
            checked:false,
            openDP:false,
            openDA:false,
            openDL:false,
            openHD:false,
            openCD:false,
            openPC:false,
            _id:'',
            name: '',
            lastName: '',
            weight: 0,
            height: 0,
            birth: '2018-11-01',
            age:0,
            gender:'M',
            email:'',
            goals:[],
            plan:'',
            appointmentTime:'',
            appointmentDate:'',
            circBrazo:0, pliegueTricipitak:0, pliegueSubescapular:0, pliegueBicipital:0, pliegueCresta:0, pliegueAbdominal:0,
            pliegueMuslo:0, plieguePantorrila:0, porcentajeGrasa:0, masaMuscular:0, porcentajeAgua:0, grasaVisceral:0, glusoca:0,
            creatininaSerica:0, urea:0, trigliceridos:0, colesterolTotal:0, HDL:0, LDL:0, VLDL:0, acidoUrico:0, hemoglobinaGlucosidala:0,
            numComidas:0, tiempoComiendo:0, alimentosComidas:0, aguaDia:0, frutaDia:0, verduraDia:0, carneQuesoHuevoDia:0, lecheDia:0,
            leguminosasDia:0, tortillaDia:0, panDia:0, bolilloDia:0, arrozPastaAvenaTapiocaDia:0, refrescoDia:0,idE:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.editPacient = this.editPacient.bind(this);
        this.editeEnable = this.editeEnable.bind(this);
        this.downloadExcel = this.downloadExcel.bind(this);

        this.savePDF = this.savePDF.bind(this);
    }

    componentWillUnmount(){
        this._isMounted = false;
        this._isMounted2 = false;
        this._isMounted3 = false;
    }

    savePDF(){
        //console.log(this.state.name,this.state.lastName,this.state.goals)
        
        if(this.state.goals.length === 0){
            this.toaster.show({intent:Intent.DANGER,message:"No podemos generar el pdf, porque el paciente aun no cuenta con un plan"});
        }else{
            console.log(this.state.goals)
            const goals = this.state.goals[0];
            const x = 15 
            let y = 50
            var doc = new jspdf();
            doc.setFontSize(12)
            doc.text(`En este contrato, yo, ${this.state.name} ${this.state.lastName}, declaro mi voluntad de obtener los siguientes beneficios.`,x,y,{maxWidth: 175, align: "justify"});
            y+=15;
            goals["beneficios"][0].forEach((e,i) => {
                doc.text(`> ${e}`,x+5,y,{maxWidth: 175, align: "justify"});
                y+=12;
            });
            doc.text(`Para obtener estos beneficios, yo me propongo como objetivo segui al pie de la letra el tratamiento nutricional que diseñaron para mí. Me propongo este objetivo estando consciente de que no será fácil de lograr, y será necesario comprometerme con este objetivo. Por esta razón, considerando los obstáculos que seguramente encontraré, me comprometo a lo siguiente: `,x,y,{maxWidth: 175, align: "justify"})
            y+=30;
            goals["compromiso"][0].forEach((e,i)=>{
                doc.text(`> ${e}`,x+5,y,{maxWidth: 175, align: "justify"});
                y+=12;
            })
            y+=10;
            doc.text('Firmo este contrato de compromiso con mi propia salud, sabiendo que cuando logre estos compromisos mi vida sera mejor.',x,y,{maxWidth: 175, align: "justify"});
            y+=20;
            doc.text('___________________',x,y)
            y+=10;
            doc.text(`${this.state.name} ${this.state.lastName}`,x+5,y);
            
            doc.save(`${this.state.lastName}-${this.state.name}.pdf`);
        }
    }

    downloadExcel(){
        console.log('Aqui va a descargar ', this.state._id);
        fetch(`/api/expedient/pacient/${this.state._id}`)
        .then(res => res.json())
        .then(data => {
            
            this.generateExcel(data)
        })
        .catch(err => console.error(err));
    }

    generateExcel(data){
        var arreglo = data.map((pacient,i)=>{
            return [
                i,
                pacient.circBrazo,pacient.pliegueTricipitak,
                pacient.pliegueSubescapular,pacient.pliegueBicipital,
                pacient.pliegueCresta,pacient.pliegueAbdominal,
                pacient.pliegueMuslo,pacient.plieguePantorrila,
                pacient.porcentajeGrasa,pacient.masaMuscular,pacient.porcentajeAgua,
                pacient.grasaVisceral,pacient.glusoca,pacient.creatininaSerica,
                pacient.urea,pacient.trigliceridos,pacient.colesterolTotal,pacient.HDL,
                pacient.LDL,pacient.VLDL,pacient.acidoUrico,pacient.hemoglobinaGlucosidala,
                pacient.numComidas,pacient.tiempoComiendo,pacient.alimentosComidas,
                pacient.aguaDia,pacient.frutaDia,pacient.verduraDia,pacient.carneQuesoHuevoDia,
                pacient.lecheDia,pacient.leguminosasDia,pacient.tortillaDia,
                pacient.panDia,pacient.bolilloDia,pacient.arrozPastaAvenaTapiocaDia,pacient.refrescoDia
            ]
        });

        console.log(arreglo)
        const headers = [
            "Expediente",
            "Circ. brazo","Pliegue Tricipitak",
            "Pliegue Subescapular","Pliegue Bicipital",
            "Pliegue Cresta Iliaca","Pliegue Abdominal",
            "Pliegue del Muslo","Pliegue Pantorrilla",
            "Porcentaje de Grasa","Masa Muscular","Porcentaje Agua",
            "Grasa Visceral","Glucosa","Creatinina Serica","Urea","Trigliceridos",
            "Colesterol Total","HDL-Colesterol","LDL-Colesterol","VLDL-Colesterol",
            "Acido Urico","Hemoglobina Glucosidala","Num. Comidas","Tiempo que ocupa en comer",
            "Alimentos entre comidas","Numero de vasos Agua/Dia","Frutas/Dia",
            "Verduras/Dia","Carne/Queso/Huevo/Dia","Leche/Dia","Leguminosas/Dia",
            "Tortilla/Dia","Pan Dulce/Dia","Bolillo/Dia","Arroz/Pasta/Avena/Tapioca/Dia",
            "Refrescos/Jugos Artificiales/Naturales/Dia"
        ];
        var dataFinal = [];
        
        dataFinal.push(headers);
        
        arreglo.forEach( e => {
            dataFinal.push(e);
        })
    
        var wb = XLSX.utils.book_new();
        wb.Props = {
            Title:'InformacionPaciente',
            Subject:'Informacion de todos los pacientes',
            CreatedDate: new Date()
        };
        wb.SheetNames.push('Pacientes');
        
        var ws_data = dataFinal;
        var ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets["Pacientes"] = ws;

        var wbout = XLSX.write(wb, {bookType:'xlsx',type:'binary'});

        saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}),`${this.state.lastName}-${this.state.name}.xlsx`);
    }

    s2ab(s){
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for(var i = 0; i < s.length; i++){
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    }

    getPacient(id){
        this._isMounted = true;
        fetch(`/api/pacients/${id}`)
        .then(res => res.json())
        .then(data => {
            if(this._isMounted){
                console.log("datos traidos del get: ",data)
                const date = moment(data.birth).add(1,'days').format('YYYY-MM-DD');
                //console.log(mom);
                this.setState({
                    _id:data._id,
                    name:data.name,
                    lastName:data.lastName,
                    weight:data.weight,
                    height:data.height,
                    birth:date,
                    age:moment().diff(date,'years'),
                    gender:data.gender==='M'?true:false,
                    email:data.email
                })
                if (typeof data.appointmentDate !== "undefined") {
                    console.log(data.appointmentDate)
                    this.setState({appointmentDate:data.appointmentDate})
                }
                if (typeof data.appointmentTime !== "undefined") {
                    console.log(data.appointmentTime)
                    this.setState({appointmentTime:data.appointmentTime})
                }
                const exp = data.expedient;
                
                if(exp.length > 0){
                    const idExp = exp[exp.length - 1]
                    console.log(idExp);
                    this.getExpedient(idExp);
                }else{
                    console.log("No hay nada");
                }

                const plan = data.plan;
                if(typeof plan != "undefined"){
                    console.log(plan)
                    this.getPlan(plan)
                }else{
                    console.log("No hay plan");
                }
                
            }
            
        })
        .catch(err => console.error(err));
    }

    getExpedient(id){
        this._isMounted2 = true;
        fetch(`/api/expedient/${id}`)
        .then(res => res.json())
        .then(data => {
            if(this._isMounted2){
                //console.log("Datos traidos exp ", data);
                this.setState({
                    circBrazo:data.circBrazo, pliegueTricipitak:data.pliegueTricipitak, 
                    pliegueSubescapular:data.pliegueSubescapular, pliegueBicipital:data.pliegueBicipital, 
                    pliegueCresta:data.pliegueCresta, pliegueAbdominal:data.pliegueAbdominal,
                    pliegueMuslo:data.pliegueMuslo, plieguePantorrila:data.plieguePantorrila, 
                    porcentajeGrasa:data.porcentajeGrasa, masaMuscular:data.masaMuscular, 
                    porcentajeAgua:data.porcentajeAgua, grasaVisceral:data.grasaVisceral, glusoca:data.glusoca,
                    creatininaSerica:data.creatininaSerica, urea:data.urea, trigliceridos:data.trigliceridos, 
                    colesterolTotal:data.colesterolTotal, HDL:data.HDL, LDL:data.LDL, VLDL:data.VLDL, acidoUrico:data.acidoUrico, 
                    hemoglobinaGlucosidala:data.hemoglobinaGlucosidala, numComidas:data.numComidas, tiempoComiendo:data.tiempoComiendo, 
                    alimentosComidas:data.alimentosComidas, aguaDia:data.aguaDia, frutaDia:data.frutaDia, verduraDia:data.verduraDia, 
                    carneQuesoHuevoDia:data.carneQuesoHuevoDia, lecheDia:data.lecheDia, 
                    leguminosasDia:data.leguminosasDia, tortillaDia:data.tortillaDia, panDia:data.panDia, bolilloDia:data.bolilloDia, 
                    arrozPastaAvenaTapiocaDia:data.arrozPastaAvenaTapiocaDia, refrescoDia:data.refrescoDia,idE:data._id
                });
            }
        });
    }

    getPlan(id){
        this._isMounted3 = true;
        fetch(`/api/plan/${id}`)
        .then(res => res.json())
        .then(data => {
            if(this._isMounted3){
                this.setState({
                    goals:data.goals
                })
            }
        })
    }

    componentDidMount(){
        this.getPacient(this.props.pacientID)
        console.log(moment().format('YYYY-MM-DD'));
        //this.getExpedient(this.state._id);
    }

    handleChange(e){
        const {name,value} = e.target;
        //console.log([name]);
        this.setState({
            [name]:value
        });
    }

    editeEnable(){
        var edit = this.state.editable===true?false:true;
        var check = this.state.checked===true?false:true;
        this.setState({
            editable:edit,
            checked:check
        });
    }

    handleValidation(){
        const name = this.state.name;
        const lastName = this.state.lastName;
        const weight = this.state.weight;
        const height = this.state.weight;
        const birth = this.state.birth;
        const date = this.state.appointmentDate;
        const hour = this.state.appointmentTime;
        let error = false;
        if(name === "" || lastName === "" || weight === "" || height === "" || birth === "" || date === "" || hour === ""){
            error = true;
        }
        console.log(error)
        return error;
    }

    editFetch(){
        const id = this.state._id;
        fetch(`/api/pacients/${id}`,{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers: {
                "Accept":'application/json',
                "Content-Type":'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.toaster.show({intent:Intent.SUCCESS,message:"Paciente actualizado"});
        })
        .catch(err=> console.error(err));
    }

    editExpedient(){
        const id = this.state.idE
        //console.log(id);
        fetch(`/api/expedient/${id}`,{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers: {
                "Accept":'application/json',
                "Content-Type":'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));
    }

    addExpedient(){
        fetch('/api/expedient',{
           method:'POST',
           body:JSON.stringify(this.state),
           headers: {
            "Accept":'application/json',
            "Content-Type":'application/json'
            }
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.error(err));
    }

    editPacient(event){
        event.preventDefault();
        if(this.handleValidation()){
            //console.log("Hay error");
            this.toaster.show({intent:Intent.DANGER,message:"Favor de llenar todos los campos"});
        }else{
            
            this.editFetch()
            this.addExpedient()
            
            //this.editExpedient();
            this.setState({editable:true,checked:false});
            
        }
    }

    render(){
        let token = localStorage.getItem('token');
        if(!token){
            return <Redirect to='/login' />
        }
        return(
            <Grid>
                <Toaster ref={(e)=>{this.toaster = e}}/>
                <Well>
                    <Row>
                        <Col xs={12} sm={12} md={5} lg={3} className="align-center">
                            <Image src={'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/photo_profile%2Fprofile-picture.png?alt=media&token=3a578951-8e59-4898-a7e6-46d905235241'} responsive thumbnail />
                            <Col style={{marginTop:"10px"}}>
                                <Button bsStyle="success" block href={`pacients/${this.state._id}/expedients`}>Expedientes</Button>
                            </Col>
                            <Col style={{marginTop:"10px"}}>
                                <Button bsStyle="success" block onClick={this.downloadExcel}>Generar Excel</Button>
                            </Col>
                        </Col>
                        <form onSubmit={(event)=>this.editPacient(event)}>
                        <Col xs={12} sm={12} md={7} lg={9}>
                        <div>
                            <Button onClick={() => this.setState({ openDP: !this.state.openDP })} block>Datos Personales</Button>
                            <Collapse in={this.state.openDP}>
                                <div>
                                    <Well>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Nombre(s)" type="text" placeholder="Nombre (s)" value={this.state.name} name="name" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Apellido (s)" type="text" placeholder="Apellido (s)" value={this.state.lastName} name="lastName" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={2}>
                                                <FieldGroup disabled={true} label="Edad" type="number" placeholder="Edad" value={this.state.age} name="age"/>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={2}>
                                                <Grid>
                                                <Row><ControlLabel>Genero</ControlLabel></Row>
                                                <Row><Radio name="radioGroup" disabled inline checked={this.state.gender}>M</Radio>
                                                <Radio name="radioGroup" disabled inline checked={!this.state.gender}>F</Radio></Row></Grid>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <FieldGroup disabled={true} label="Correo electronico" type="email" placeholder="Correo electronico" value={this.state.email} name="email"/>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <FieldGroup disabled={this.state.editable} label="Peso (kg)" type="number" placeholder="Peso" value={this.state.weight} name="weight" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <FieldGroup disabled={this.state.editable} label="Altura (cm)" type="number" placeholder="Altura" value={this.state.height} name="height" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Well>
                                </div>
                            </Collapse>
                            <Button onClick={() => this.setState({ openDA: !this.state.openDA })} block>Datos Antropometricos</Button>
                            <Collapse in={this.state.openDA}>
                                <div>
                                    <Well>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Circunferencia Brazo (cm)" type="number" placeholder="Circunferencia Brazo (cm)" value={this.state.circBrazo} name="circBrazo" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Pliegue Tricipitak (mm)" type="number" placeholder="Pliegue Tricipitak (mm)" value={this.state.pliegueTricipitak} name="pliegueTricipitak" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Pliegue Subescapular (mm)" type="number" placeholder="Pliegue Subescapular (mm)" value={this.state.pliegueSubescapular} name="pliegueSubescapular" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Pliegue Bicipital (mm)" type="number" placeholder="Pliegue Bicipital (mm)" value={this.state.pliegueBicipital} name="pliegueBicipital" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Pliegue de la Cresta Iliaca (mm)" type="number" placeholder="Pliegue de la Cresta Iliaca (mm)" value={this.state.pliegueCresta} name="pliegueCresta" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Pliegue Abdominal (mm)" type="number" placeholder="Pliegue Abdominal (mm)" value={this.state.pliegueAbdominal} name="pliegueAbdominal" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Pliegue del Muslo (mm)" type="number" placeholder="Pliegue del Muslo (mm)" value={this.state.pliegueMuslo} name="pliegueMuslo" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Pliegue de Pantorrilla (mm)" type="number" placeholder="Pliegue de Pantorrilla (mm)" value={this.state.plieguePantorrila} name="plieguePantorrila" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Porcentaje de Grasa (%)" type="number" placeholder="Porcentaje de Grasa (%)" value={this.state.porcentajeGrasa} name="porcentajeGrasa" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Masa Muscular (Kg)" type="number" placeholder="Masa Muscular (Kg)" value={this.state.masaMuscular} name="masaMuscular" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Porcentaje de agua (%)" type="number" placeholder="Porcentaje de agua (%)" value={this.state.porcentajeAgua} name="porcentajeAgua" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Grasa Visceral" type="number" placeholder="Grasa Visceral" value={this.state.grasaVisceral} name="grasaVisceral" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Well>
                                </div>
                            </Collapse>
                            <Button onClick={() => this.setState({ openDL: !this.state.openDL })} block>Datos de Laboratorio</Button>
                            <Collapse in={this.state.openDL}>
                                <div>
                                    <Well>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Glucosa (mg/dl)" type="number" placeholder="Glucosa (mg/dl)" value={this.state.glusoca} name="glusoca" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Creatinina Serica (mg/dl)" type="number" placeholder="Creatinina Serica (mg/dl)" value={this.state.creatininaSerica} name="creatininaSerica" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Urea (mg/dl)" type="number" placeholder="Urea (mg/dl)" value={this.state.urea} name="urea" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Trigliceridos (mg/dl)" type="number" placeholder="Trigliceridos (mg/dl)" value={this.state.trigliceridos} name="trigliceridos" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Colesterol Total (mg/dl)" type="number" placeholder="Colesterol Total (mg/dl)" value={this.state.colesterolTotal} name="colesterolTotal" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="HDL - Colesterol (mg/dl)" type="number" placeholder="HDL - Colesterol (mg/dl)" value={this.state.HDL} name="HDL" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="LDL - Colesterol (mg/dl)" type="number" placeholder="LDL - Colesterol (mg/dl)" value={this.state.LDL} name="LDL" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="VLDL - Colesterol (mg/dl)" type="number" placeholder="VLDL - Colesterol (mg/dl)" value={this.state.VLDL} name="VLDL" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Acido Urico (mg/dl)" type="number" placeholder="Acido Urico (mg/dl)" value={this.state.acidoUrico} name="acidoUrico" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Hemoglobina Glucosidala (%)" type="number" placeholder="Hemoglobina Glucosidala (%)" value={this.state.hemoglobinaGlucosidala} name="hemoglobinaGlucosidala" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Well>
                                </div>
                            </Collapse>
                            <Button onClick={() => this.setState({ openHD: !this.state.openHD })} block>Historia dietetico</Button>
                            <Collapse in={this.state.openHD}>
                                <div>
                                    <Well>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Numero de comidas" type="number" placeholder="Numero de comidas" value={this.state.numComidas} name="numComidas" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Tiempo que ocupa en comer" type="number" placeholder="Tiempo que ocupa en comer" value={this.state.tiempoComiendo} name="tiempoComiendo" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Alimentos entre comida" type="number" placeholder="Alimentos entre comida" value={this.state.alimentosComidas} name="alimentosComidas" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Numero de vasos de Agua/Dia" type="number" placeholder="Numero de vasos de Agua/Dia" value={this.state.aguaDia} name="aguaDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Frutas/Dia" type="number" placeholder="Frutas/Dia" value={this.state.frutaDia} name="frutaDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Verdura/Dia" type="number" placeholder="Verdura/Dia" value={this.state.verduraDia} name="verduraDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Carne/Queso/Huevo/Dia" type="number" placeholder="Carne/Queso/Huevo/Dia" value={this.state.carneQuesoHuevoDia} name="carneQuesoHuevoDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Leche/Dia" type="number" placeholder="Leche/Dia" value={this.state.lecheDia} name="lecheDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Leguminosas/Dia" type="number" placeholder="Leguminosas/Dia" value={this.state.leguminosasDia} name="leguminosasDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Tortilla/Dia" type="number" placeholder="Tortilla/Dia" value={this.state.tortillaDia} name="tortillaDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Pan Dulce/Dia" type="number" placeholder="Pan Dulce/Dia" value={this.state.panDia} name="panDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Bolillo/Dia" type="number" placeholder="Bolillo/Dia" value={this.state.bolilloDia} name="bolilloDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Arroz/Pasta/Avena/Tapioca/Dia" type="number" placeholder="Arroz/Pasta/Avena/Tapioca/Dia" value={this.state.arrozPastaAvenaTapiocaDia} name="arrozPastaAvenaTapiocaDia" onChange={this.handleChange} />
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4}>
                                                <FieldGroup disabled={this.state.editable} label="Refrescos/Jugos Artificiales/Naturales/Dia" type="number" placeholder="Refrescos/Jugos Artificiales/Naturales/Dia" value={this.state.refrescoDia} name="refrescoDia" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Well>
                                </div>
                            </Collapse>
                            <Button onClick={() => this.setState({ openPC: !this.state.openPC })} block>Proxima Cita</Button>
                            <Collapse  in={this.state.openPC}>
                            <div>
                                <Well>
                                <FormGroup>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={6}>
                                        <ControlLabel>Fecha</ControlLabel>
                                        <input type="date" 
                                            className="datetime" 
                                            disabled={this.state.editable} 
                                            id="input-date" 
                                            name="appointmentDate"
                                            value={this.state.appointmentDate} 
                                            onChange={this.handleChange}></input>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={6}>
                                        <ControlLabel>Hora</ControlLabel>
                                        <input type="time" 
                                            className="datetime" 
                                            disabled={this.state.editable} 
                                            id="input-hour"
                                            name="appointmentTime"
                                            value={this.state.appointmentTime} 
                                            onChange={this.handleChange}></input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                </Well>
                            </div>
                            </Collapse >
                        </div>
                        <Row>
                            <Col xs={6} sm={6} md={4} lg={2} >
                            <label className="switch">
                                <input type="checkbox" onChange={this.editeEnable} checked={this.state.checked}></input>
                                <span className="slider round"></span>
                            </label>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={5} style={{marginTop:"10px"}}>
                                <Button disabled={this.state.editable} bsStyle="success" block type="submit">Editar</Button>
                            </Col>
                            <Col xs={12} sm={12} md={4} lg={5} style={{marginTop:"10px"}}>
                                <Button bsStyle="success" block href={`pacients/${this.state._id}/add-plan`}>Agregar Plan</Button>
                            </Col>
                        </Row>
                        <Row>   
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <Button bsStyle="success" block onClick={this.savePDF}>Descargar PDF</Button>
                            </Col>
                        </Row>
                        </Col>
                        </form>
                    </Row>
                </Well>
            </Grid>
        )
    }
}

export default PacientProfile;