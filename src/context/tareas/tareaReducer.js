import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_FORM_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyecto: state.tareas.filter(
          (tarea) => tarea.proyectoId === action.payload
        ),
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareas: [action.payload, ...state.tareas],
        errorTarea: false,
      };
    case VALIDAR_FORM_TAREA:
      return {
        ...state,
        errorTarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };
    case ACTUALIZAR_TAREA:
    case ESTADO_TAREA:
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload.id ? action.payload : tarea
        ),
        //limpiar tarea forma1 tareaActual: null,
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaActual: action.payload,
      };
    //forma2
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaActual: null,
      };
    default:
      return state;
  }
};
