import { LabeledSelect } from "@common/components"
import { Input } from "./ui/Input"

const incidentTypes = [
  { label: 'Acoso verbal', value: 'verbal_abuse' },
  { label: 'Violencia física', value: 'physical_violence' },
  { label: 'Maltrato emocional', value: 'emotional_abuse' },
  { label: 'Abuso sexual', value: 'sexual_abuse' },
]
const locations = [
  { label: 'Casa', value: 'house' },
  { label: 'Al Aire Libre (calle, parque, etc.)', value: 'outdoor' },
  { label: 'Centro Educativo', value: 'school' },
  { label: 'Lugar de trabajo', value: 'workplace' },
]

const genders = [
  { label: 'Masculino', value: 'male' },
  { label: 'Femenino', value: 'female' },
]

const months = [
  { label: 'Enero', value: '1' },
  { label: 'Febrero', value: '2' },
  { label: 'Marzo', value: '3' },
  { label: 'Abril', value: '4' },
  { label: 'Mayo', value: '5' },
  { label: 'Junio', value: '6' },
  { label: 'Julio', value: '7' },
  { label: 'Agosto', value: '8' },
  { label: 'Septiembre', value: '9' },
  { label: 'Octubre', value: '10' },
  { label: 'Noviembre', value: '11' },
  { label: 'Diciembre', value: '12' },
]

export const IncidentForm = () => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Formulario de incidente</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <LabeledSelect
                label="Tipo de incidente"
                options={incidentTypes}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">País</label>
              <input 
                type="text" 
                className="block w-full mt-1 rounded-md border border-[#34A0A4] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34A0A4]" 
                placeholder="El Salvador"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ciudad</label> 
              <input 
                type="text" 
                className="block w-full mt-1 rounded-md border border-[#34A0A4] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34A0A4]" 
                placeholder="San Salvador"
              />
            </div>
            <div className="space-y-2">
              <LabeledSelect
                label="Location"
                options={locations}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Edad</label>
              <input 
                type="number" 
                className="block w-full mt-1 rounded-md border border-[#34A0A4] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34A0A4]" 
                defaultValue="18"
                min="1"
                max="100"
              />
            </div>
            <div className="space-y-2">
              <LabeledSelect
                label="Género"
                options={genders}
              />
            </div>
            <div className="space-y-2">
              <LabeledSelect
                label="Mes"
                options={months}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Año</label>
              <input 
                type="number" 
                className="block w-full mt-1 rounded-md border border-[#34A0A4] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34A0A4]" 
                defaultValue={new Date().getFullYear()}
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}