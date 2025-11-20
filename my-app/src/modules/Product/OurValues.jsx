import "../../theme/scss/OurValues.scss"

export function OurValues () {


    return (
        <div className="wrapperValues">
            <h2 className="wrapperValues__title">Наши ценности<img className='mark' src="/headerUS.png" alt="" /></h2>
                <div className="wrapperValues__container">
                    <div className="wrapperValues__card">
                        <div className="kart"><img src="/card1.png" alt="" /></div>
                        <div className="txt">
                            <h2>Стабильность</h2>
                            <p >Мы опираемся на традиции и проверенные ценности. <br/> Стабильность — это уверенность в завтрашнем дне, вера в команду и готовность действовать с хладнокровием и честью в любых обстоятельствах.<br/></p>
                        </div>
                    </div>
                    <div className="wrapperValues__card">
                        <div className="kart"><img src="/card2.png" alt="" /></div>
                        <div className="txt">
                            <h2>Устойчивость</h2>
                            <p>Мы развиваемся через знание и технологический прогресс. <br/> Совмещая военную выправку с современными ИТ-проектами, мы формируем поколение, способное мыслить стратегически и действовать точно. <br/> возможностей для бизнеса до последовательного развития <br/> <br/> </p>
                        </div>
                    </div>
                    <div className="wrapperValues__card">
                        <div className="kart"><img src="/card3.png" alt="" /></div>
                        <div className="txt">
                            <h2>Команда</h2>
                            <p>В «Вымпеле» каждый — часть единого строя. <br/> Нас объединяет взаимная поддержка, уважение и общее дело — воспитание сильных духом, образованных и ответственных граждан своей страны.<br/> </p>
                        </div>
                    </div>
                    <div className="wrapperValues__card">
                        <div className="kart"><img src="/card4.png" alt="" /></div>
                        <div className="txt">
                            <h2>Репутация</h2>
                            <p>Честь — наш главный знак отличия.<br/> Мы следуем принципам дисциплины, ответственности и патриотизма. Наши дела говорят громче слов — мы делаем то, что обещаем.</p>
                        </div>
                    </div>                                                        
                </div>
            <div className="wrapperValues__line">
                <img src="/line2.png" alt="" />
            </div>
        </div>
    );
}