import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_FORM_TAREA,
  ELIMINAR_TAREA,
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
        tareasProyecto: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasProyecto: [action.payload, ...state.tareasProyecto],
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
        tareasProyecto: state.tareasProyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
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
