
import statistics
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
if __name__ == '__main__':

    # Use a service account
    cred = credentials.Certificate('data.json')
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    # read statics data
    rooms_statistics = db.collection(u'rooms_statistics')
    rooms_stat = rooms_statistics.stream()

    len_room = []
    for room in rooms_stat:
        id = room.id
        dict  = room.to_dict()
        dict['id'] = room.id
        try:
            dict['time_length'] = (dict['time_end'] - dict['time_start_active'])
            dict['time_start_length'] =dict['time_start_active']-dict['time_start']
            len_room.append(dict)
        except:
            print('error')


    time_length_list = [val['time_length'].seconds for val in len_room]
    time_start_length_list = [val['time_start_length'].seconds for val in len_room]
    messages = [val['messages_count'] for val in len_room]

    time_start_length = []

    print("the avg active room time is  ",statistics.mean(time_length_list))

    print("the median active room time is ",statistics.median(time_length_list))

    print("the avge messages in room is ", statistics.mean(messages))

    print("the median messages in room is ", statistics.median(messages))


    print("the avge start time in room is {} ", statistics.mean(time_start_length_list))

    print("the median start time in room is {} ", statistics.median(time_start_length_list))

    print(len_room)




