FROM python:3.7.5
ENV PYHTONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .
