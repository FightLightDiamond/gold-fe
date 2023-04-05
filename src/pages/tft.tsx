import {memo, useEffect, useState} from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCardHeader
} from 'mdb-react-ui-kit';
import * as _ from "lodash";

interface cardBought {
    id: number
    amount: number,
}

const TFT = () => {
    /**
     * Danh sách các loại item
     */
    const items = [
        {id: 1, name: 'atk+10'},
        {id: 2, name: 'def+10'},
        {id: 3, name: 'crit+10'},
        {id: 4, name: 'crit_dmg+10'},
        {id: 5, name: 'hp+10'},
        {id: 6, name: 'remove+def'},
        {id: 7, name: 'crit+10'},
        {id: 8, name: 'atk+10'},
        {id: 9, name: 'I-50%'},
        {id: 9, name: 'Y-50%'},
        {id: 10, name: 'I hp+10'},
        {id: 11, name: 'gold +2'},
        {id: 12, name: 'hutmau+10'},
        {id: 13, name: 'remove+crit'},
        {id: 14, name: 'def-10%'},
        {id: 15, name: 'cuop atk+10'},
        {id: 16, name: 'atk-10'},
        {id: 17, name: 'def-10'},
        {id: 18, name: 'crit-10'},
        {id: 19, name: 'crit_dmg-10'},
        {id: 20, name: 'hp+10'},
    ];

    let [round, setRound] = useState(1)
    let [hp, setHp] = useState(2000)
    let [gold, setGold] = useState(10)
    let [lv, setLv] = useState(1)
    /**
     * List để select
     */
    const [listSelect, setListSelect] = useState<any>([])

    const onSep = (idItem: number) => {
        // const item = _.filter(waitingItems, (item) => {
        //     return item.id = id
        // })
        for (const key in waitingItems) {
            let abc = null;
            const item = waitingItems[key]
            const {id, star} = item

            if (id === idItem) {
                if (star === 1) {
                    waitingItems[key].star = 2
                } else if(star === 2) {
                    if(null === abc) {
                        abc = key
                    } else {
                        waitingItems[abc].star = 3;
                        waitingItems[key] = null
                    }
                }
            }
        }
    }
    /**
     * Waiting items
     */
    const [waitingItems, setWaitingItems] = useState<any>([
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
    ])
    /**
     * War items
     */
    const [warItems, setWarItems] = useState<any>([
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
        {id: 0, star: 1},
    ])
    /**
     * Tất cả card đã pick
     */
    const [cards, setCards] = useState<any>({})

    /**
     * Use Effect
     */
    useEffect(() => {
        console.log(cards)
    }, [cards])

    useEffect(() => {
        console.log(lv)
    }, [lv])

    useEffect(() => {
        console.log(round)
    }, [round])

    const add = (id: number) => {
        let amount = cards[id];
        if (amount) {
            cards[id] = ++amount
        } else {
            // Nếu không có
            cards[id] = 1
        }

        setCards(cards)
    }

    const remove = (id: number, qtySub: number) => {
        let qty = cards[id];
        if (qty != undefined && qtySub <= qty) {
            cards[id] = qty - qtySub
            setCards(cards)

            gold += qtySub
            setGold(gold)
        }
    }

    const qtyToLevel = (qty: number) => {
        const cardLv = new Map()
        while (qty > 0) {
            if (qty > 4) {
                const no = qty % 4
                cardLv.set(3, no)
                qty -= no * 4
            } else if (qty > 2) {
                const no = qty % 2
                cardLv.set(2, no)
                qty -= no * 2

                if (qty === 1) {
                    cardLv.set(1, qty)
                    qty = 0
                }
            }
        }
    }

    const hero = {
        hp: 1000,
        def: 20,
        atk: 100,
        crit: 20,
        crit_dmg: 200
    }

    const mathDmg = (S: number, D: number) => {
        if (D > 0) return S * 100 / (100 + D)
        return S * (2 - 100 / (100 - D))
    }

    const upGold = (gold: number = 10, ration: number = 2) => {
        return Math.floor(gold / ration)
    }

    const roll = () => {
        if (gold === 0) return;
        --gold
        setGold(gold)
        getRandomListSelect(3)
    }

    const buy = (cardId: number, index: number) => {
        if (gold === 0) return;

        --gold
        setGold(gold)
        add(cardId);

        delete listSelect[index]

        setListSelect(listSelect)
    }

    const sell = (cardId: number, qty: number = 1) => {
        remove(cardId, qty);
    }

    const nextRound = () => {
        round++
        setRound(round)
        gold += upGold(gold) + 2
        setGold(gold)
    }

    const upLv = () => {
        if (gold >= lv + 1) {
            setLv(++lv)
            gold -= lv
            setGold(gold)
        }
    }

    const getRandomItem = (arr: object[]) => {
        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);
        // get random item
        return arr[randomIndex];
    }

    const getRandomListSelect = (qty: number = 6) => {
        const listSelect = [];
        for (let i = 0; i < qty; i++) {
            listSelect.push(getRandomItem(items))
        }
        setListSelect(listSelect)
        return listSelect;
    }

    return (
        <div className={"container"}>
            <p>Round: {round}</p>
            <p>Gold: {gold}</p>
            <p>Lv: {lv}</p>
            <p>{JSON.stringify(cards)}</p>
            <MDBRow className='mb-3'>
                <MDBBtn onClick={roll} floating tag='a'>
                    <MDBIcon fas icon="sync"/>
                </MDBBtn>
                <MDBBtn onClick={upLv} floating tag='a'>
                    <MDBIcon fas icon="level-up-alt"/>
                </MDBBtn>
                <MDBBtn onClick={nextRound} floating tag='a'>
                    <MDBIcon fas icon="chevron-right"/>
                </MDBBtn>
            </MDBRow>
            <h2>CARD</h2>
            <MDBRow className='mb-3'>
                {listSelect.map((item: any, key: number) =>
                    <MDBCol key={key} size='4' onClick={() => buy(item.id, key)}>
                        <MDBCard alignment='center' background='dark' className='text-white'>
                            <MDBCardImage overlay src={`/img/without/${item?.id}.png`} position='top' alt='...'/>
                            <MDBCardBody>
                                {/*<MDBCardTitle>{item.id}</MDBCardTitle>*/}
                                <MDBCardText>
                                    + 10% ATK
                                </MDBCardText>
                                {/*<MDBBtn >BUY</MDBBtn>*/}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )}
            </MDBRow>


            {/*<MDBRow className='mb-3'>*/}
            {/*    {itemsBought.map((item: any, key: number) =>*/}
            {/*        <MDBCol key={key} size='3' className='mb-3'>*/}
            {/*            <MDBCard alignment='center' onClick={() => sell(1)}>*/}
            {/*                <MDBCardHeader>{key + 1}</MDBCardHeader>*/}
            {/*                <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp'*/}
            {/*                              alt='...'/>*/}
            {/*            </MDBCard>*/}
            {/*        </MDBCol>*/}
            {/*    )}*/}
            {/*</MDBRow>*/}
        </div>
    );
};

export default memo(TFT);
