// Authors: Javier Sanz Sáez
//          Javier Antón Yuste

// SPDX-License-Identifier: GPL-3.O
pragma solidity ^0.8.7;

contract Asignatura {
    uint public version = 2021;
    /**
     * address del profesor que ha desplegado el contrato.
     * El contrato lo despliega el profesor.
     */

    address public profesor;
    string public nombre; // Subject's name
    string public curso;  // Academic year
    address public owner; // User that has deployed the contract
    address public coordinador; // Coordinator's address
    bool public cerrada; // Boolean to check whether the subject is closed or not
    mapping(address => string) public datosProfesor;  // Dict: name-address
    address[] public profesores; // Proffessors' user addresses
    
    // Error definition
    error DNIExistsError (string dni);

    /**
     * Datos de una evaluación
     */
    struct Evaluacion {
        string nombre;
        uint fecha;
        uint puntos;
    }
    
    /// Evaluaciones de la asignatura
    Evaluacion[] public evaluaciones;
    
    /// Datos de un getAlumno
    struct DatosAlumno{
        string nombre;
        string email;
        string dni;
    }
    
    /// Acceder a los datos de un alumno dada su dirección
    mapping(address => DatosAlumno) public datosAlumno;
    
    // Mapping para poder comprobar si existe el DNI 
    mapping(string => string) public dniMap;
    
    /// Array con las direcciones de los alumnos matriculados
    address[] public matriculas;
    
    /// Tipos de notas: no presentado, nota entre 0 y 10, y matricula
    enum TipoNota { NP, Normal, MH }
    
    /**
     * Datos de una nota.
     * La calificación está multiplicada por 100 porque no hay decimales
     */
     struct Nota {
        TipoNota tipo;
        uint calificacion;
    }
    
    // Dada pa direccion de un alumno, y el indice de la evaluación, devuelve
    // la nota del alumno
    mapping (address => mapping (uint => Nota)) public calificaciones;
    
    // Constructor 
     constructor(string memory _nombre, string memory _curso) {
         
        bytes memory bn = bytes(_nombre);
        require(bn.length != 0, "Subject's name can't be blank");
         
        bytes memory bc = bytes(_curso);
        require(bc.length != 0, "Subject's academic year can't be blank");
         
        nombre = _nombre;
        curso = _curso;
        profesor = msg.sender;
        owner = msg.sender;
        cerrada = false;
    }
    
    // Getters
    function getNombreProfesor(address dirProfesor) public view returns (string memory){
        return datosProfesor[dirProfesor];
    }
    function getDatosAlumno(address dirAlumno) public view returns (DatosAlumno memory){
        return datosAlumno[dirAlumno];
    }
    function getCalificacion(address dirAlumno, uint indice) public view returns (Nota memory){
        return calificaciones[dirAlumno][indice];
    } 
    function miNota(uint evaluacion) soloMatriculados public view returns (TipoNota tipo, uint calificacion){
        require(evaluacion < evaluaciones.length, "Evaluation's index does not exist");
        Nota memory nota = calificaciones[msg.sender][evaluacion];
        
        tipo = nota.tipo;
        calificacion = nota.calificacion;
    }
     
    // Setter
    function setCoordinador(address coord) soloOwner soloAbierta public {
        coordinador = coord;
    }
      
    function cerrar() soloCoordinador public{
        cerrada = true;
    }

    function abrir() soloCoordinador public{
        cerrada = false;
    }
    
    function addProfesor(address dirProfesor, string memory nombreProfesor) soloOwner soloAbierta public {
        
        bytes memory bn = bytes(nombreProfesor);
        require(bn.length != 0, "Professor's name can't be blank");
        
        string memory existeProfesor = getNombreProfesor(dirProfesor);
        bytes memory bep = bytes(existeProfesor);
        require(bep.length == 0, "Can't add a professor multiple times");
        
        profesores.push(dirProfesor);
        datosProfesor[dirProfesor] = nombreProfesor;
    }
    
    function profesoresLength() public view returns (uint) {
        return profesores.length;
    }

     function evaluacionesLength () public view returns (uint) {
        return evaluaciones.length;
    }
    
    function creaEvaluacion (string memory _nombre, uint _fecha, uint _puntos) soloAbierta soloCoordinador public returns (uint) {
                
        bytes memory bn = bytes(_nombre);
        require(bn.length != 0, "Evaluation's name can't be blank");
        
        evaluaciones.push (Evaluacion (_nombre, _fecha, _puntos));
        return evaluaciones.length - 1;
    }

     function matriculasLength () public view returns (uint) {
        return matriculas.length;
    }

    function automatricula (string memory _nombre, string memory _email, string memory _dni) soloAbierta noMatriculados public {
                
        bytes memory bn = bytes(_nombre);
        require(bn.length != 0, "Name can't be blank");
        bytes memory em = bytes(_email);
        require(em.length != 0, "Email can't be blank");
        bytes memory bdni = bytes(_dni);
        require(bdni.length != 0, "ID number can't be blank");
        
        string memory DNIExists = dniMap[_dni];
        bytes memory bdni_exists = bytes(DNIExists);

        if (bdni_exists.length != 0){
            revert DNIExistsError({
                dni:DNIExists
            });
        }
        
        DatosAlumno memory datos = DatosAlumno(_nombre,_email,_dni);
        
        datosAlumno[msg.sender] = datos;
        dniMap[_dni] = _nombre;
        
        matriculas.push(msg.sender);
    
    }
    
    function quienSoy() soloMatriculados public view returns (string memory _nombre, string memory _email, string memory _dni){
        DatosAlumno memory datos = datosAlumno[msg.sender];
        _nombre = datos.nombre;
        _email = datos.email;
        _dni = datos.dni;
    }
    
    function califica(address alumno, uint evaluacion, TipoNota tipo, uint calificacion) soloProfesor soloAbierta public{
        
        require(estaMatriculado(alumno), "You can only mark an enrolled student");
        require(evaluacion < evaluaciones.length, "You can't mark a non-existant evaluation");
        require(calificacion <= 1000, "You can't mark with higher than 1000");
        
        Nota memory nota = Nota(tipo, calificacion);
        
        calificaciones[alumno][evaluacion] = nota;
    }
    
     function estaMatriculado(address alumno) private view returns (bool){
         
         string memory _nombre = datosAlumno[alumno].nombre;
         bytes memory b = bytes(_nombre);
         return b.length != 0;
     }
    
    
    // Modifiers
     modifier soloProfesor() {
         require(msg.sender == profesor, "Only proffesor allowed");
         _;
     }
     modifier soloMatriculados(){
         require(estaMatriculado(msg.sender), "Only enrolled students allowed");
         _;
     }
     modifier noMatriculados(){
         require(!estaMatriculado(msg.sender), "Only non-enrolled students allowed");
         _;
     }
     modifier soloOwner(){
         require(msg.sender == owner, "Only contract's owner allowed");
         _;
     }
     modifier soloCoordinador(){
         require(msg.sender == coordinador, "Only Coordinator allowed");
         _;
     }
      modifier soloAbierta(){
          require(cerrada == false, "Only allowed if the subject is open");
          _;
      }
     
      receive() external payable{
          revert("No money transfer allowed");
      }

}
