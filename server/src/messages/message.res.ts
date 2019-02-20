import { Resolver, Mutation, Arg, Query, Args, Subscription, Root, PubSub, PubSubEngine, Publisher } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Message } from './Message.ent';
import { Repository } from 'typeorm';
import { MessageSendInput, MessageHistoryArgs } from './message.in';

@Resolver()
export class MessageResolver {

    @InjectRepository(Message)
    private messageRepo: Repository<Message>;

    @Query(returns => [Message])
    messages(
        @Args() { skip, take }: MessageHistoryArgs
    ) {
        return this.messageRepo.find({
            order: {
                id: 'DESC',
            },
            skip,
            take,
        });
    }

    @Mutation(returns => Boolean)
    async clearMessages() {
        try {
            await this.messageRepo.clear();
            return true;
        } catch {
            return false;
        }
    }

    @Mutation(returns => Message)
    async sendMessage(
        @Arg('data') newData: MessageSendInput,
        @PubSub('NEW_MESSAGE') publish: Publisher<Message>,
    ) {
        const newMessage = this.messageRepo.create(newData);

        const message = await this.messageRepo.save(newMessage);
        
        await publish(message);

        return message;
    }

    @Subscription(
        returns => Message,
    {
        topics: 'NEW_MESSAGE',
    })
    newMessage(
        @Root() message: Message,
    ) {
        return message;
    }
}
