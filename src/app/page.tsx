"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("bg-BG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const validateNumberInput = (value: string) => {
  const normalized = value.replace(",", "."); // позволява запетая
  return /^(\d+)?([.,]\d*)?$/.test(value) ? normalized : "";
};

const defaultProperty = () => ({
  area: "",
  density: "",
  kint: "",
  costPerSqm: "",
  compensationPercent: "",
  infrastructureCoef: "",
});

export default function PropertyCalculator() {
  const [activeTab, setActiveTab] = useState<"private" | "municipal">("private");

  const [privateProperties, setPrivateProperties] = useState([defaultProperty()]);
  const [municipalProperties, setMunicipalProperties] = useState([defaultProperty()]);

const handleChange = (index: number, field: string, value: string, isMunicipal = false) => {
  const updated = isMunicipal ? [...municipalProperties] : [...privateProperties];
  const validatedValue = validateNumberInput(value);
  updated[index][field] = validatedValue;
  isMunicipal ? setMunicipalProperties(updated) : setPrivateProperties(updated);
};

  const addProperty = (isMunicipal = false) => {
    isMunicipal
      ? setMunicipalProperties([...municipalProperties, defaultProperty()])
      : setPrivateProperties([...privateProperties, defaultProperty()]);
  };

  const deleteProperty = (index: number, isMunicipal = false) => {
    const updated = isMunicipal
      ? municipalProperties.filter((_, i) => i !== index)
      : privateProperties.filter((_, i) => i !== index);
    isMunicipal ? setMunicipalProperties(updated) : setPrivateProperties(updated);
  };

  const calculateValues = (property: any) => {
    const area = parseFloat(property.area) || 0;
    const kint = parseFloat(property.kint) || 0;
    const costPerSqm = parseFloat(property.costPerSqm) || 0;
    const compensationPercent = parseFloat(property.compensationPercent) || 0;
    const infrastructureCoef = parseFloat(property.infrastructureCoef) || 0;

    const maxRZP = area * kint;
    const marketPrice = maxRZP * costPerSqm * (compensationPercent / 100) * infrastructureCoef;

    return {
      maxRZP,
      marketPrice,
    };
  };

  const totalPrivate = privateProperties.reduce((sum, prop) => sum + calculateValues(prop).marketPrice, 0);
  const totalMunicipal = municipalProperties.reduce((sum, prop) => sum + calculateValues(prop).marketPrice, 0);
  const difference = totalMunicipal - totalPrivate;

  return (
    <div className="min-h-screen bg-cover bg-center p-6 space-y-6 max-w-6xl mx-auto" style={{ backgroundImage: "url('/bg.png')" }}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        <img src="/logo.png" alt="Лого" className="h-64" />
        <div className="flex-1 w-full">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-200 mt-2 mb-8">
            <span className="block lg:inline">Калкулатор</span>
            <span className="block lg:inline"> оценки на имоти</span>
          </h1>
          <Card className="bg-white/10 rounded-2xl overflow-hidden mb-4 border border-white/10">
  <CardContent className="p-2 text-xl text-gray-300">
    Разлика в цените на общинските имоти и частните имоти:
  </CardContent>
  <div className="bg-white/10 p-2 text-2xl text-gray-100 font-bold">
     {formatNumber(difference)} лв
  </div>
</Card>


          <div className="flex space-x-4 border-b border-white/20 pb-2 mb-4">
            <button
              onClick={() => setActiveTab("private")}
              className={`px-4 py-2 text-lg font-medium transition-colors focus:outline-none ${
                activeTab === "private"
                  ? "border-b-2 border-white text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Частни имоти
            </button>
            <button
              onClick={() => setActiveTab("municipal")}
              className={`px-4 py-2 text-lg font-medium transition-colors focus:outline-none ${
                activeTab === "municipal"
                  ? "border-b-2 border-white text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Общински имоти
            </button>
          </div>
        </div>
      </div>

      {activeTab === "private" && (
        <PropertySection
          title="Частни имоти"
          properties={privateProperties}
          onChange={handleChange}
          onDelete={deleteProperty}
          onAdd={addProperty}
          isMunicipal={false}
          total={totalPrivate}
        />
      )}

      {activeTab === "municipal" && (
        <PropertySection
          title="Общински имоти"
          properties={municipalProperties}
          onChange={handleChange}
          onDelete={deleteProperty}
          onAdd={addProperty}
          isMunicipal={true}
          total={totalMunicipal}
        />
      )}
    </div>
  );
}

function PropertySection({
  title,
  properties,
  onChange,
  onDelete,
  onAdd,
  isMunicipal,
  total,
}: any) {
  const calculateValues = (property: any) => {
    const area = parseFloat(property.area) || 0;
    const kint = parseFloat(property.kint) || 0;
    const costPerSqm = parseFloat(property.costPerSqm) || 0;
    const compensationPercent = parseFloat(property.compensationPercent) || 0;
    const infrastructureCoef = parseFloat(property.infrastructureCoef) || 0;
    const maxRZP = area * kint;
    const marketPrice = maxRZP * costPerSqm * (compensationPercent / 100) * infrastructureCoef;
    return { maxRZP, marketPrice };
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-200">{title}</h2>
      <div className="space-y-4">
        {properties.map((property: any, index: number) => {
          const { maxRZP, marketPrice } = calculateValues(property);
          return (
            <div key={index}>
              {index > 0 && <hr className="border-t border-gray-400 opacity-30 mb-4" />}
              <Card className="relative bg-white/10 rounded-2xl">
                <button className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => onDelete(index, isMunicipal)}>
                  <X className="w-4 h-4" />
                </button>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  <Input placeholder="Площ (кв.м)" value={property.area} onChange={(e) => onChange(index, "area", e.target.value, isMunicipal)} />
                  <Input placeholder="Плътност (%)" value={property.density} onChange={(e) => onChange(index, "density", e.target.value, isMunicipal)} />
                  <Input placeholder="КИНТ (напр. 1.2, 2)" value={property.kint} onChange={(e) => onChange(index, "kint", e.target.value, isMunicipal)} />
                  <Input placeholder="Цена/кв.м" value={property.costPerSqm} onChange={(e) => onChange(index, "costPerSqm", e.target.value, isMunicipal)} />
                  <Input placeholder="% Обезщетение" value={property.compensationPercent} onChange={(e) => onChange(index, "compensationPercent", e.target.value, isMunicipal)} />
                  <Input placeholder="Коеф. инфраструктура (напр. 0.6, 0.8, 1)" value={property.infrastructureCoef} onChange={(e) => onChange(index, "infrastructureCoef", e.target.value, isMunicipal)} />
                </CardContent>
                <div className="bg-white/10 px-6 py-4 text-sm text-gray-300">
                  <p>Максимално РЗП: <strong>{formatNumber(maxRZP)}</strong> кв.м</p>
                  <p>Пазарна стойност: <strong>{formatNumber(marketPrice)}</strong> лв</p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
  <Button
    onClick={() => onAdd(isMunicipal)}
    className="bg-white/10 text-gray-200 border border-gray-200 rounded-2xl hover:bg-white/20 w-full sm:w-auto"
  >
    ➕ Добави имот
  </Button>
  <div className="text-xl font-semibold text-gray-200 text-center sm:text-right w-full sm:w-auto">
    Обща стойност: {formatNumber(total)} лв
  </div>
</div>
    </div>
  );
}
