import { ID } from "@core/util/meta/ID";
import { Prop } from "@core/util/meta/Prop";
import { CardStatusEnum } from "../enums/CardStatus.enum";
import { MetaEntity } from "@core/util/meta/MetaEntity";
import { XfdFxEntityEnum } from "../xfd_fk.EntityEnum";
import { SelectOne } from "@core/util/meta/ref/SelectOne";
import { getAlias } from "@core/util/meta/alias";

@MetaEntity({ objectCode: XfdFxEntityEnum.Card as any, objectName: "卡号" })
export class Card {
    @ID()
    @Prop("卡id", { power: 0 })
    id: number;            // id
    @Prop("卡号")
    cardNo: string;        // 卡号
    @SelectOne(getAlias(CardStatusEnum))
    @Prop("卡状态")
    cardStatus: CardStatusEnum; // 卡状态
    @Prop("商户号")
    merchNo: string;       // 商户号
}