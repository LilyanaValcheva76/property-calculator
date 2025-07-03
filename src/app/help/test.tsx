export default function HelpPage() {
  return (
    <div className="min-h-screen text-gray-100 p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">Помощ: Как да използвате калкулатора</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Изберете тип имоти</h2>
        <p>
          Калкулаторът има два таба: <strong>Частни имоти</strong> и <strong>Общински имоти</strong>. Можете да добавяте по няколко имота във всяка категория.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Попълнете параметрите</h2>
        <p>За всеки имот въведете следните стойности:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Площ (кв.м)</strong> – например 500</li>
          <li><strong>Плътност (%)</strong> – например 40</li>
          <li><strong>КИНТ</strong> – например 1.2 или 2</li>
          <li><strong>Цена/кв.м</strong> – пазарна цена, например 150</li>
          <li><strong>% Обезщетение</strong> – например 25</li>
          <li><strong>Коеф. инфраструктура</strong> – например 0.6, 0.8 или 1</li>
        </ul>
        <p>Допускат се само числови стойности – десетични числа се въвеждат с точка или запетая.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Добавяне и премахване на имоти</h2>
        <p>
          Използвайте бутона <strong>„➕ Добави имот“</strong>, за да добавите нов ред. Можете да изтриете имот чрез червения бутон <strong>„Х“</strong> в горния десен ъгъл на всяка карта.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Резултати</h2>
        <p>
          В долната част на всяка категория се показва <strong>общата пазарна стойност</strong>. В най-горната част на страницата ще видите <strong>разликата между общинските и частните имоти</strong>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Сваляне като PDF</h2>
        <p>
          Натиснете бутона <strong>„📄 Свали като PDF“</strong>, за да свалите въведените данни и изчисления във файл. Шрифтът поддържа кирилица.
        </p>
      </section>

      <footer className="pt-4 border-t border-white/10 text-sm text-gray-400">
        Ако имате въпроси или предложения, свържете се с нас.
      </footer>
    </div>
  );
}
