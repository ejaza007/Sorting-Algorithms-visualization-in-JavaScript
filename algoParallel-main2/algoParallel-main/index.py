import _thread
from flask import Flask
from flask import request
import math
from time import sleep
from flask_cors import CORS


def bucket_sort(i, array):
    # arr[math.floor((x[i]*10))]=x[i]
    index = math.floor(i * 10)
    # print(index)
    array[index].append(i)


def bucket_sort_parallel(buckets, size, array):
    for i in range(size):
        array.append([])
    for i in buckets:
        print(i)
        arg_tuple = (i, array)
        _thread.start_new_thread(bucket_sort, arg_tuple)
    print(array)

    return array


app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def get_array_and_sort():
    array = request.json['array']
    if not array:
        return{'sorted':[0]}
    size = len(array)
    print(size)

    arr = bucket_sort_parallel(array, size, [])
    sleep(0.001)
    for i in range(size):
        # sort buckets
        arr[i].sort()
        k = 0
        finalArray = [None] * size
        # Format result so that it is easily understandable by next.js on the frontend
        for i in range(size):
            for j in range(len(arr[i])):
                finalArray[k] = arr[i][j]
                k += 1
    return {'sorted': finalArray}


if __name__ == '__main__':
    app.run(debug=False)
