FROM anibali/pytorch:no-cuda
ENV PYHTONUNBUFFERED 1
USER root
RUN mkdir /code
WORKDIR /code

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .
