import { CollectionConfig } from 'payload/types';

const Chats: CollectionConfig = {
    slug: 'Chats',
    access:{
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
},
     fields: [
    {
      name: "from",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
        name:"to",
        type:"relationship",
        relationTo: "users",
        required: true,
    },
    {
        name:"message",
        type:"text",
        required:true,
    }
]
}

export default Chats