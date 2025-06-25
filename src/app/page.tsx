"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FloatingInput } from "@/components/ui/floating-input";
import { X } from "lucide-react";
import jsPDF from "jspdf";
import { robotoBase64 } from "../fonts/roboto";

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("bg-BG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};


const defaultProperty = () => ({
  name: "",
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

  if (field === "name") {
    // За текстово поле
    updated[index][field] = value;
  } else {
    // За числови полета
    const normalized = value.replace(",", ".");
    const isValid = /^(\d+)?([.,]\d*)?$/.test(value);
    if (!isValid && value !== "") return;
    updated[index][field] = normalized;
  }

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


const handleDownloadPDF = () => {
  const doc = new jsPDF();

  (doc as any).addFileToVFS("Roboto-Regular.ttf", robotoBase64);
  (doc as any).addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");

  let y = 10;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.height;

  const addLine = (text: string, fontSize = 12) => {
    if (y + lineHeight > pageHeight - 10) {
      doc.addPage();
      y = 10;
    }
    doc.setFontSize(fontSize);
    doc.text(text, 10, y);
    y += lineHeight;
  };

  const printProperties = (title: string, properties: any[]) => {
    addLine(title, 16);

    if (properties.length === 0) {
      addLine("Няма добавени имоти.");
      return;
    }

    properties.forEach((p, index) => {
      addLine(`Имот ${index + 1}:`, 13);
      addLine(`№ (име на имота): ${p.name || "-"}`);
      addLine(`Площ (кв. м): ${p.area || "-"}`);
      addLine(`Плътност (%): ${p.density || "-"}`);
      addLine(`КИНТ: ${p.kint || "-"}`);
      addLine(`Цена/кв. м: ${p.costPerSqm || "-"}`);
      addLine(`% Обезщетение: ${p.compensationPercent || "-"}`);
      addLine(`Коеф. инфраструктура: ${p.infrastructureCoef || "-"}`);
      addLine(""); // празен ред между имотите
    });
  };

  addLine("Оценки на имоти", 18);
  addLine("");

  printProperties("Частни имоти", privateProperties);
  addLine("");
  printProperties("Общински имоти", municipalProperties);
  addLine("");

  addLine(`Разлика в стойностите: ${formatNumber(difference)} лв.`, 14);

  doc.save("kalkulator-ocenki.pdf");
};




  return (
    <div className="min-h-screen bg-cover bg-center p-6 space-y-6 max-w-6xl mx-auto" style={{ backgroundImage: "url('/bg.png')" }}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        <img src="/logo.png" alt="Лого" className="h-64" />
        <div className="flex-1 w-full">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-200 mt-2 mb-8">
            <span className="block lg:inline">Калкулатор</span>
            <span className="block lg:inline"> оценки на имоти</span>
          </h1>


<Card className="bg-white/10 rounded-2xl overflow-hidden mb-6 border border-white/10">
  <CardContent className="p-2 text-xl text-gray-300">
    Разликата в цените на общинските имоти и частните имоти:
  </CardContent>
  <div className="bg-white/10 p-4 text-2xl text-gray-100 font-bold flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
    <span>{formatNumber(difference)} лв.</span>
    <Button
      onClick={handleDownloadPDF}
      className="bg-white/20 text-gray-200 border border-white/20 hover:bg-white/30 text-base rounded-lg"
    >
      📄 Свали като PDF
    </Button>
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
              

<Card className="relative bg-white/10 rounded-2xl">
  <button
    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
    onClick={() => onDelete(index, isMunicipal)}
  >
    <X className="w-4 h-4" />
  </button>

  <CardContent className="space-y-6 p-6">

    {/* Секция: Основни данни */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FloatingInput
      type="text"
      label="№ (име на имота)"
      value={property.name}
      onChange={(e) => onChange(index, "name", e.target.value, isMunicipal)}
    />
    <FloatingInput
      type="number"
      label="Площ (кв. м)"
      value={property.area}
      onChange={(e) => onChange(index, "area", e.target.value, isMunicipal)}
    />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
    <FloatingInput
      type="number"
      label="КИНТ (напр. 1.2, 2)"
      value={property.kint}
      onChange={(e) => onChange(index, "kint", e.target.value, isMunicipal)}
    />
    <div className="text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-md h-full flex items-center">
      РЗП: <strong className="ml-2">{formatNumber(maxRZP)} кв. м </strong> 
    </div>
  </div>

    {/* Група 2: Строителна стойност */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
  <FloatingInput
    type="number"
    label="Еталонна цена (лв./кв. м)"
    value={property.costPerSqm}
    onChange={(e) => onChange(index, "costPerSqm", e.target.value, isMunicipal)}
  />
  <div className="text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-md h-full flex items-center">
    Стойност строителство: {" "}
    <strong className="ml-1">{formatNumber(maxRZP * (parseFloat(property.costPerSqm) || 0))}  лв.</strong>
  </div>
</div>


    {/* Група 3: Корекции */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FloatingInput
        type="number"
        label="% Обезщетение"
        value={property.compensationPercent}
        onChange={(e) => onChange(index, "compensationPercent", e.target.value, isMunicipal)}
      />
      <FloatingInput
        type="number"
        label="Коеф. инфраструктура (напр. 0.6, 0.8, 1)"
        value={property.infrastructureCoef}
        onChange={(e) => onChange(index, "infrastructureCoef", e.target.value, isMunicipal)}
      />
    </div>

    {/* Изчисление: Пазарна цена */}
    <div className="w-full bg-white/5 px-4 py-3 rounded-md text-m text-gray-300 flex items-center gap-2">
      <span className="text-lg">💰</span>
      <span>
        Пазарна цена: <strong>{formatNumber(marketPrice)}</strong> лв.
      </span>
    </div>
  </CardContent>
</Card>


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
    Обща стойност: {formatNumber(total)} лв.
  </div>
</div>
    </div>
  );
}
