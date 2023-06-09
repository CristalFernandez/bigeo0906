import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, Tab, Form, Dropdown } from "react-bootstrap";
import axios from "axios";
import "./buttonG.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function ButtonG({ data, onButtonClick }) {
  //states

  const [estado, setEstado] = useState('No Leído');
  const formData = data;

  const marcarLeido = () => {
    setEstado('Leído');
  };

  const marcarEnProceso = () => {
    setEstado('Asignado y en Proceso');
  };

  const marcarFinalizado = () => {
    setEstado('Finalizado');
  };

  //tabs
  const [activeTab, setActiveTab] = useState('datos');
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [textoInput, setTextoInput] = useState('');

  useEffect(() => {
    const url = 'http://localhost:3000/forms';
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(url, config);
        const data = response;
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [opcionSeleccionada1, setOpcionSeleccionada1] = useState('');
  
  const [opcionSeleccionada2, setOpcionSeleccionada2] = useState('');

  const handleTabSelect = (tabName) => {
    setActiveTab(tabName);
  };
  const handleOpcionSeleccionada1 = (opcion) => {
    setOpcionSeleccionada1(opcion);
  };
  const handleOpcionSeleccionada2 = (opcion) => {
    setOpcionSeleccionada2(opcion);
  };

  const handleTextoInputChange = (event) => {
    setTextoInput(event.target.value);
  };

  //modals
  const [showModal, setShowModal] = useState(false);
  // console.log(showModal);
  const [showModal2, setShowModal2] = useState(false);
  // console.log(showModal2);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    console.log(showModal);
  };

  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };


  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [diasEntreFechas, setDiasEntreFechas] = useState(0);

  const handleFechaInicioChange = (date) => {
    setFechaInicio(date);
    calcularDiasEntreFechas(date, fechaFin);
  };

  const handleFechaFinChange = (date) => {
    setFechaFin(date);
    calcularDiasEntreFechas(fechaInicio, date);
  };

  const calcularDiasEntreFechas = (inicio, fin) => {
    if (inicio && fin) {
      const diferencia = Math.abs(fin - inicio);
      const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      setDiasEntreFechas(dias);
    } else {
      setDiasEntreFechas(0);
    }
  };


  const handleGuardarAsignar = () => {
    // Aquí puedes realizar la lógica para guardar y asignar la tarea
    console.log("Guardar y asignar tarea:", opcionSeleccionada, textoInput);
    closeModal();



  };

  return (
    <div>
      <p className={`estado ${estado.toLowerCase()}`}>Estado: {estado}</p>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            marcarLeido();
            openModal();
            onButtonClick(data);
          }}
          disabled={estado === 'Leído' | estado === 'Asignado y en Proceso'}
        >
          Ver
        </button>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => {
            marcarEnProceso();
            openModal2();
          }}
          disabled={estado === 'No Leído' | estado === 'Asignado y en Proceso' | estado === 'Finalizado'}
        >
          Asignar
        </button>
        <button
          type="button"
          className="btn btn-outline-danger "
          onClick={marcarFinalizado}
          disabled={estado != 'Asignado y en Proceso' | estado === 'Leído' | estado === 'No Leído'}
        >
          Completar
        </button>
      </div>


      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        size="lg"
        dialogClassName="modal-top">

        <Modal.Header closeButton>
          <Modal.Title>Formulario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            activeKey={activeTab}
            onSelect={handleTabSelect}
            className="mb-3"
          >
            <Tab eventKey="datos" title="Datos">
              <h2>ID</h2>
              {formData && (
                <table className="table table-striped table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">ID Formulario</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Fecha y Hora</th>
                      <th scope="col">Sector</th>
                      <th scope="col">Tipo Sector</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={formData.id}>
                      <th scope="row">{formData.form_id}</th>
                      <td>{formData.type}</td>
                      <td>{formData.properties.dateTime}</td>
                      <td>{formData.geometry.gid}</td>
                      <td>{formData.geometry.type}</td>
                    </tr>
                  </tbody>
                  <h3>Propiedades</h3>
                  <thead>
                    <tr>
                      <th scope="col">Usuario</th>
                      <th scope="col">ID Aspersor</th>
                      <th scope="col">Codigo Aspersor</th>
                      <th scope="col">Defecto</th>
                      <th scope="col">Reparado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={formData.properties.userId}>
                      <th scope="row">{formData.properties.userId}</th>
                      <td>{formData.properties.formSprinkler.spid}</td>
                      <td>{formData.properties.formSprinkler.spcode}</td>
                      <td>{formData.properties.formSprinkler.defect}</td>
                      <td>{formData.properties.formSprinkler.repaired}</td>
                    </tr>
                  </tbody>
                  <h3>Ubicacion</h3>
                  <thead>
                    <tr>
                      <th scope="col">Observacion</th>
                      <th scope="col">ID Ubicacion</th>
                      <th scope="col">Coodenadas</th>
                      <th scope="col">Tipo Ubicacion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={formData.properties.formSprinkler.observation}>
                      <th scope="row">{formData.properties.formSprinkler.observation}</th>
                      <td>{formData.geometry.gid}</td>
                      <td>{formData.geometry.coordinates.join(", ")}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </Tab>

            <Tab eventKey="ubicacion" title="Ubicación">
              {
                formData && (
                  <>
                    {
                      (() => {
                        let [lat, lon] = formData.geometry.coordinates;
                        return (
                          <div>
                            <p>Ubicación: Latitud: {lat}, Longitud: {lon}</p>
                          </div>
                        );
                      })()
                    }
                  </>
                )
              }

            </Tab>

            <Tab eventKey="imagen" title="Imagen">
              {formData && (
                <div>
                  <img src={formData.imagen} alt="Imagen del formulario" />
                  <p>Nombre del formulario: {formData.nombreFormulario}</p>
                  <p>Estado: {formData.estado}</p>
                </div>
              )}
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal2}
        onHide={closeModal2}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Asignar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formOpcionesDesplegables">
              <Form.Label><h4>Ejecutor</h4></Form.Label>
              <Dropdown onSelect={handleOpcionSeleccionada1}>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  setTextoInput="Seleccione Fecha"
                >
                  {opcionSeleccionada1 ? opcionSeleccionada1 : "Seleccionar opción"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Opción 1">Opción 1</Dropdown.Item>
                  <Dropdown.Item eventKey="Opción 2">Opción 2</Dropdown.Item>
                  <Dropdown.Item eventKey="Opción 3">Opción 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Label><h4>Plazo</h4></Form.Label>
              <div className="date-pickers-container">
                <div>
                  <span>Desde:</span>
                  <DatePicker
                    selected={fechaInicio}
                    onChange={handleFechaInicioChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control datepicker-sm"
                  />
                </div>
                <div>
                  <span>Hasta:</span>
                  <DatePicker
                    selected={fechaFin}
                    onChange={handleFechaFinChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control datepicker-sm ml-2"
                  />
                </div>
                <div className="total-days">
                  <span>Total de Días: {diasEntreFechas}</span>
                </div>
              </div>
              <Form.Label><h4>Prioridad</h4></Form.Label>
              <Dropdown onSelect={handleOpcionSeleccionada2}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {opcionSeleccionada2 ? opcionSeleccionada2 : "Seleccionar opción"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Opción Alta">Alta</Dropdown.Item>
                  <Dropdown.Item eventKey="Opción Media">Media</Dropdown.Item>
                  <Dropdown.Item eventKey="Opción Baja">Baja</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group controlId="formTextoInput">
              <Form.Label><h4>Observaciones</h4></Form.Label>
              <Form.Control
                type="text"
                placeholder="Escriba el texto aqui"
                value={textoInput}
                onChange={handleTextoInputChange}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarAsignar}>
            Guardar y Asignar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
