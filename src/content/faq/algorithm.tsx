import {
  FaCogs,
  FaChartLine,
  FaShieldAlt,
  FaExclamationTriangle,
  FaHandPointDown,
  FaPercentage,
  FaDollarSign,
  FaArrowRight,
  FaTimes,
  FaCheck,
  FaInfoCircle,
} from "react-icons/fa";

export const algorithmContent = (
  <>
    <h2>
      <FaCogs style={{ color: "#FF7A3D", marginRight: "8px" }} />
      ТОРГОВЫЙ АЛГОРИТМ
    </h2>
    
    <p>Каждый трейдер ищет то что поможет ему торговать успешно. Мы с гордостью представляем вам наш торговый алгоритм которые поможет сохранить и преумножить ваш депозит.</p>
    
    <h4>
      <FaChartLine style={{ color: "#FF7A3D", marginRight: "8px" }} />
      1. Режим маржи. Плечи.
    </h4>
    <ul>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Торгуем на кросс-марже.</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Кросс-маржа автоматически использует доступный баланс во избежание ликвидации какой-либо позиции.</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Плечо выбираем не более х30. Новичкам рекомендую не более х10.</li>
    </ul>
    
    <h4>
      <FaShieldAlt style={{ color: "#FF7A3D", marginRight: "8px" }} />
      2. Размер позиции.
    </h4>
    <ul>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Строго 1% от депозита и 1% на усреднение.</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> При этом, каждая сделка - одна и та же сумма. Ни больше, ни меньше. Не нужно менять сумму вхождения в сделку. Увеличится депозит - увеличатся суммы вхождения в сделку. Но каждая сделка - одна и та же сумма.</li>
    </ul>
    
    <h4>
      <FaPercentage style={{ color: "#FF7A3D", marginRight: "8px" }} />
      3. Количество позиций.
    </h4>
    <ul>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Одновременно не более трех позиций, в которых может находиться не более 6% депозита.</li>
    </ul>
    
    <h4>
      <FaHandPointDown style={{ color: "#FF7A3D", marginRight: "8px" }} />
      4. Порядок открытия позиции.
    </h4>
    <ul>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Позицию открываем несколькими лимитными ордерами по диапазону входа.</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Лимитные ордера должны быть равномерно распределены по % от общей суммы сделки.</li>
    </ul>
    
    <h5>
      <FaInfoCircle style={{ color: "#FF7A3D", marginRight: "8px" }} />
      К примеру:
    </h5>
    <ul>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Сигнал: ВТС long 55000-53000</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Вы выделяете 100$ на сделку.</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> При входе в позицию четырьмя лимитными ордерами ваши ордера будут выглядеть так: 25$ на 55000; 25$ на 54500; 25$ на 54000; 25$ на 53000.</li>
    </ul>
    
    <p>
      <FaExclamationTriangle style={{ color: "#FF7A3D", marginRight: "8px" }} />
      При упущенной безопасной точки входа — пропустите сделку. Лучше не заработать, чем взять на себя дополнительные риски и потерять весь депозит.
    </p>
    
    <p>
      <FaTimes style={{ color: "#FF7A3D", marginRight: "8px" }} />
      После достижения ценой первого тейка <strong>сетап не актуален</strong> и в него заходить не рекомендуется, даже если цена вернулась к зоне набора позиции.
    </p>
    
    <h4>
      <FaDollarSign style={{ color: "#FF7A3D", marginRight: "8px" }} />
      5. Фиксация прибыли.
    </h4>
    
    <p>Беспроигрышный вариант это фиксация прибыли при чистом движении цены на 1-2-3%, т.е. с плечом х20 это будет 20-40-60%.</p>
    
    <p>На каждом из этих значений можно фиксировать по 25% от позиции. Можно и больше.</p>
    
    <p>При желании, фиксируем позицию по тейкам, указанным в сетапе.</p>
    
    <p>После фиксации первой части, стоп двигаем на точку входа. После фиксации второй части – в профит.</p>
    
    <h5>
      <FaInfoCircle style={{ color: "#FF7A3D", marginRight: "8px" }} />
      К примеру:
    </h5>
    <ul>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Сигнал: ВТС long тейки: 55500; 55800; 60000. Ваша точка входа допустим 54200.</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> Расставляем тейк-профиты: 25% на 55500$; 25% на 55800$; 25% на 60000$.</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> При достижении ценой 55500$ – фиксируется часть профита и стоп двигается на точку входа – в данном случае на 54200$.</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> При достижении ценой 55800$ – фиксируется еще часть профита и стоп двигаем выше точки входа в профит (на любой уровень, можно даже на первый тейк).</li>
      <li><FaArrowRight style={{ color: "#FF7A3D", marginRight: "8px" }} /> При достижении ценой последнего тейка (60000$) - фиксируется еще часть и стоп подвигается выше. Если цена пошла дальше в нужном нам направлении, периодически подвигаем стоп ближе к рыночной цене либо фиксируем в зависимости от вашей жадности.</li>
    </ul>
    
    <div style={{ 
      background: "#1a1a1a", 
      border: "2px solid #FF7A3D", 
      borderRadius: "8px", 
      padding: "20px", 
      margin: "20px 0",
      textAlign: "center"
    }}>
      <h3 style={{ color: "#FF7A3D", marginBottom: "15px" }}>
        <FaExclamationTriangle style={{ marginRight: "8px" }} />
        DISCLAIMER
      </h3>
      <p>
        <FaCheck style={{ color: "#4CAF50", marginRight: "8px" }} />
        Ответственность за открытие/закрытие сделки лежит на вас.
      </p>
      <p>
        <FaExclamationTriangle style={{ color: "#FF7A3D", marginRight: "8px" }} />
        В случае нарушения вышеперечисленных рекомендаций мы пользуемся правом не предоставлять консультации, так как нарушение алгоритма является осознанным лудоманством и любая рекомендация может привести к необратимым последствиям.
      </p>
    </div>
  </>
)

