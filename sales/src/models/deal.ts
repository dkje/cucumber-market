import mongoose from "mongoose";

interface DealAttrs {
  title: string;
  price: number;
  userId: string;
}

interface DealDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface DealModel extends mongoose.Model<DealDoc> {
  build(atts: DealAttrs): DealDoc;
}

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

dealSchema.statics.build = (attr: DealAttrs) => {
  return new Deal(attr);
};

const Deal = mongoose.model<DealDoc, DealModel>("Deal", dealSchema);

export { Deal };
